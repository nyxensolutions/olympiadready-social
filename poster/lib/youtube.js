// YouTube Data API v3 — upload a video/Short to the channel.
//
// Required env vars:
//   YT_CLIENT_ID      — OAuth 2.0 client ID (Web application type)
//   YT_CLIENT_SECRET  — OAuth 2.0 client secret
//   YT_REFRESH_TOKEN  — long-lived refresh token for the channel owner

const fs   = require("fs");
const path = require("path");

const TOKEN_URL  = "https://oauth2.googleapis.com/token";
const UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// Exchange refresh token for a fresh access token.
async function getAccessToken() {
  const res  = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     need("YT_CLIENT_ID"),
      client_secret: need("YT_CLIENT_SECRET"),
      refresh_token: need("YT_REFRESH_TOKEN"),
      grant_type:    "refresh_token",
    }),
  });
  const body = await res.json();
  if (!res.ok || !body.access_token) {
    throw new Error(`YouTube token refresh failed: ${JSON.stringify(body)}`);
  }
  return body.access_token;
}

// Upload a video file and return the YouTube video ID.
// metadata: { title, description, tags: [], categoryId }
async function uploadVideo(videoPath, metadata) {
  const token     = await getAccessToken();
  const fileSize  = fs.statSync(videoPath).size;
  const videoMeta = {
    snippet: {
      title:       metadata.title,
      description: metadata.description,
      tags:        metadata.tags || [],
      categoryId:  metadata.categoryId || "27", // 27 = Education
    },
    status: {
      privacyStatus:           "public",
      selfDeclaredMadeForKids: false,
    },
  };

  // Step 1 — initiate resumable upload, get upload URL
  const initRes = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      "Authorization":          `Bearer ${token}`,
      "Content-Type":           "application/json",
      "X-Upload-Content-Type":  "video/mp4",
      "X-Upload-Content-Length": String(fileSize),
    },
    body: JSON.stringify(videoMeta),
  });

  if (!initRes.ok) {
    const err = await initRes.text();
    throw new Error(`YouTube initiate upload failed (${initRes.status}): ${err}`);
  }

  const uploadUri = initRes.headers.get("location");
  if (!uploadUri) throw new Error("YouTube API did not return an upload URI");

  // Step 2 — upload the video bytes
  const videoBuffer = fs.readFileSync(videoPath);
  const uploadRes   = await fetch(uploadUri, {
    method: "PUT",
    headers: {
      "Content-Type":   "video/mp4",
      "Content-Length": String(fileSize),
    },
    body: videoBuffer,
  });

  const result = await uploadRes.json();
  if (!uploadRes.ok || !result.id) {
    throw new Error(`YouTube upload failed (${uploadRes.status}): ${JSON.stringify(result)}`);
  }

  return result.id; // YouTube video ID
}

module.exports = { uploadVideo };
