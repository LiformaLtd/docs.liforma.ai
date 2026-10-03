export const authExample = `Authorization: Bearer lfm_live_…`;

	export const listAvatars = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/avatars
Authorization: Bearer lfm_live_…`;

	export const avatarResponse = `{
  "avatars": [
    {
      "id": "avatar_a7n3kx2q",
      "displayName": "Sofia",
      "defaultVoiceId": "<project TTS voice id>",
      "defaultSttLang": "en-US",
      "gender": "male",
      "age": 55,
      "ethnicity": "european",
      "species": "human",
      "style": "Liforma 3D",
      "costumes": [
        { "id": "costume_u3q8x5nd", "name": "Examiner", "source": "catalogue", "libraryScope": "liforma" }
      ],
      "clothes": [
        { "id": "clothes_c8m4pq7z", "name": "Blazer", "source": "library", "libraryScope": "project" }
      ],
      "hair": [
        { "id": "hair_h2d8kw6r", "name": "Short", "source": "library", "libraryScope": "project" }
      ]
    }
  ]
}`;

	export const createUpload = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/uploads
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "purpose": "colour",
  "contentType": "image/png",
  "bytes": 2086713,
  "sha256": "<64-char hex or base64 SHA-256>"
}`;

	export const uploadCreated = `{
  "upload": {
    "id": "upload_LOC",
    "status": "pending",
    "expiresAt": "2026-08-25T12:15:00.000Z"
  },
  "put": {
    "url": "https://<presigned-private-r2>",
    "headers": {
      "Content-Type": "image/png",
      "Content-Length": "2086713",
      "x-amz-meta-sha256": "<hex SHA-256>"
    }
  }
}`;

	export const putUpload = `PUT https://<presigned-private-r2>
Content-Type: image/png
Content-Length: 2086713
x-amz-meta-sha256: <hex SHA-256>

<raw image bytes>`;

	export const completeUpload = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/uploads/upload_LOC/complete
Authorization: Bearer lfm_live_…`;

	export const uploadCompleted = `{
  "upload": {
    "id": "upload_LOC",
    "status": "uploaded",
    "bytes": 2086713,
    "sha256": "<hex SHA-256>"
  }
}`;

	export const createBackdrop = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/backdrops
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "name": "Hotel lobby",
  "uploadId": "upload_LOC",
  "externalId": "cms-bdrop-lobby"
}`;

	export const backdropAccepted = `{
  "job": {
    "id": "job_BDROP",
    "status": "queued",
    "kind": "backdrop",
    "pollUrl": "/v1/projects/proj_a7k3m9qp/jobs/job_BDROP",
    "targetId": "bdrop_b9x3mn5q",
    "requiredOk": false,
    "stage": null,
    "progress": { "requiredVerified": 0, "requiredTotal": 0 },
    "error": null
  },
  "backdrop": { "id": "bdrop_b9x3mn5q", "status": "processing" }
}`;

	export const pollJob = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/jobs/job_BDROP
Authorization: Bearer lfm_live_…`;

	export const getBackdrop = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/backdrops/bdrop_b9x3mn5q
Authorization: Bearer lfm_live_…`;

	export const jobSucceeded = `{
  "job": {
    "id": "job_BDROP",
    "status": "succeeded",
    "kind": "backdrop",
    "pollUrl": "/v1/projects/proj_a7k3m9qp/jobs/job_BDROP",
    "targetId": "bdrop_b9x3mn5q",
    "requiredOk": true,
    "stage": "webp",
    "progress": { "requiredVerified": 11, "requiredTotal": 11 },
    "error": null
  }
}`;

	export const backdropReady = `{
  "backdrop": {
    "kind": "backdrop",
    "id": "bdrop_b9x3mn5q",
    "status": "ready",
    "name": "Hotel lobby",
    "depthEncoding": "lf-disparity-v1",
    "style": "Liforma 3D",
    "externalId": "cms-bdrop-lobby"
  }
}`;

	export const createSet = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/sets
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "backdropId": "bdrop_b9x3mn5q",
  "name": "Hotel lobby",
  "externalId": "cms-set-lobby"
}`;

	export const setCreated = `{
  "set": {
    "id": "set_s93jm2q4",
    "name": "Hotel lobby",
    "backdropId": "bdrop_b9x3mn5q",
    "style": "Liforma 3D",
    "externalId": "cms-set-lobby",
    "createdAt": "2026-08-25T12:00:20.000Z",
    "updatedAt": "2026-08-25T12:00:20.000Z"
  }
}`;

	export const createClothes = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/clothes
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "avatar_a7n3kx2q",
  "name": "Reception uniform",
  "uploadId": "upload_CLOTHES",
  "backgroundMode": "remove",
  "externalId": "cms-clothes-uniform"
}`;

	export const clothesAccepted = `{
  "job": {
    "id": "job_CLOTHES",
    "status": "queued",
    "kind": "clothes",
    "pollUrl": "/v1/projects/proj_a7k3m9qp/jobs/job_CLOTHES",
    "targetId": "clothes_c8m4pq7z",
    "requiredOk": false,
    "stage": null,
    "progress": { "requiredVerified": 0, "requiredTotal": 0 },
    "error": null
  },
  "clothes": { "id": "clothes_c8m4pq7z", "status": "processing" }
}`;

	export const createHair = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/hair
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "avatar_a7n3kx2q",
  "name": "Tied back",
  "uploadId": "upload_HAIR",
  "backgroundMode": "remove",
  "externalId": "cms-hair-tied"
}`;

	export const createCharacter = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/characters
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "avatarId": "avatar_a7n3kx2q",
  "name": "Alex",
  "voice": "<project TTS voice id>",
  "sttLang": "en-US",
  "clothesId": "clothes_c8m4pq7z",
  "hairId": "hair_h2d8kw6r",
  "personality": "Warm hotel receptionist.",
  "generalInstructions": "Keep replies short. Stay in character.",
  "gender": "female",
  "age": 28,
  "ethnicity": "european",
  "externalId": "cms-char-482"
}`;

	export const characterCreated = `{
  "character": {
    "id": "char_c4k29x7p",
    "projectId": "proj_a7k3m9qp",
    "name": "Alex",
    "avatarId": "avatar_a7n3kx2q",
    "voice": "<project TTS voice id>",
    "sttLang": "en-US",
    "clothesId": "clothes_c8m4pq7z",
    "hairId": "hair_h2d8kw6r",
    "personality": "Warm hotel receptionist.",
    "generalInstructions": "Keep replies short. Stay in character.",
    "gender": "female",
    "age": 28,
    "ethnicity": "european",
    "style": "Liforma 3D",
    "externalId": "cms-char-482",
    "createdAt": "2026-08-25T12:01:00.000Z",
    "updatedAt": "2026-08-25T12:01:00.000Z"
  }
}`;

	export const createExperience = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/experiences
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "title": "Hotel check-in",
  "slug": "english/CEFR/A1/hotel_check_in",
  "attributes": {
    "language": "english",
    "curriculum": "CEFR",
    "level": "A1"
  },
  "characterId": "char_c4k29x7p",
  "setId": "set_s93jm2q4",
  "startingMessage": "Welcome. How can I help you today?",
  "systemInstructions": "You are a hotel receptionist. Help the guest check in.",
  "introduction": "Practice checking into a hotel.",
  "interaction": {
    "showUserSpeech": true,
    "playCharacterSpeech": true,
    "controls": {
      "voice": false,
      "captions": false,
      "microphone": false,
      "textInput": false
    }
  },
  "publish": true,
  "externalId": "cms-scenario-482"
}`;

	export const experienceResponse = `{
  "experience": {
    "id": "exp_e14wqb5m",
    "projectId": "proj_a7k3m9qp",
    "title": "Hotel check-in",
    "slug": "english/CEFR/A1/hotel_check_in",
    "status": "published",
    "hasPublishedRevision": true,
    "hasUnpublishedChanges": false,
    "published": true,
    "attributes": {
      "language": "english",
      "curriculum": "CEFR",
      "level": "A1"
    },
    "characterId": "char_c4k29x7p",
    "setId": "set_s93jm2q4",
    "startingMessage": "Welcome. How can I help you today?",
    "systemInstructions": "You are a hotel receptionist. Help the guest check in.",
    "introduction": "Practice checking into a hotel.",
    "interaction": {
      "showUserSpeech": true,
      "playCharacterSpeech": true,
      "controls": {
        "voice": false,
        "captions": false,
        "microphone": false,
        "textInput": false
      }
    },
    "externalId": "cms-scenario-482",
    "createdAt": "2026-08-25T12:01:10.000Z",
    "updatedAt": "2026-08-25T12:01:10.000Z"
  }
}`;

	export const optionalDepth = `{
  "name": "Hotel lobby",
  "uploadId": "upload_LOC",
  "depth": {
    "uploadId": "upload_DEPTH",
    "depthMapType": "disparity",
    "metersPerDepth": 2
  }
}`;

	export const patchExperience = `PATCH https://api.liforma.ai/v1/projects/proj_a7k3m9qp/experiences/exp_e14wqb5m
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "title": "Hotel check-in (A1)",
  "slug": "english/CEFR/A1/hotel_check_in",
  "attributes": {
    "language": "english",
    "curriculum": "CEFR",
    "level": "A1"
  },
  "startingMessage": "Welcome. How can I help you today?",
  "systemInstructions": "You are a hotel receptionist. Help the guest check in.",
  "introduction": "Practice checking into a hotel.",
  "interaction": {
    "controls": {
      "voice": false
    }
  }
}`;

	export const publishExperience = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/experiences/exp_e14wqb5m/publish
Authorization: Bearer lfm_live_…`;

	export const getExperience = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/experiences/exp_e14wqb5m
Authorization: Bearer lfm_live_…`;

	export const getCharacter = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/characters/char_c4k29x7p
Authorization: Bearer lfm_live_…`;

	export const getSet = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/sets/set_s93jm2q4
Authorization: Bearer lfm_live_…`;

	export const patchCharacter = `PATCH https://api.liforma.ai/v1/projects/proj_a7k3m9qp/characters/char_c4k29x7p
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "personality": "Warm hotel receptionist.",
  "generalInstructions": "Keep replies short. Stay in character.",
  "gender": "female",
  "age": 28,
  "ethnicity": "european"
}`;

	export const patchSet = `PATCH https://api.liforma.ai/v1/projects/proj_a7k3m9qp/sets/set_s93jm2q4
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "name": "Hotel lobby",
  "backdropId": "bdrop_b9x3mn5q"
}`;

	export const patchClothes = `PATCH https://api.liforma.ai/v1/projects/proj_a7k3m9qp/clothes/clothes_c8m4pq7z
Authorization: Bearer lfm_live_…
Content-Type: application/json

{
  "name": "Reception uniform"
}`;

	export const retryJob = `POST https://api.liforma.ai/v1/projects/proj_a7k3m9qp/jobs/job_BDROP/retry
Authorization: Bearer lfm_live_…`;

	export const catalogByPath = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/experiences/english/CEFR/A1/hotel_check_in
Authorization: Bearer lfm_live_…`;

	export const catalogList = `GET https://api.liforma.ai/v1/projects/proj_a7k3m9qp/experiences
Authorization: Bearer lfm_live_…`;

	export const errorExample = `{
  "error": {
    "code": "SLUG_CONFLICT",
    "message": "Slug \\"english/CEFR/A1/hotel_check_in\\" is already used in this project.",
    "requestId": "req_…"
  }
}`;
