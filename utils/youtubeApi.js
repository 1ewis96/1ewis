/**
 * Utility functions for interacting with the YouTube Data API
 */

/**
 * Extract playlist ID from a YouTube URL
 * @param {string} url - YouTube playlist URL
 * @returns {string|null} - Playlist ID or null if invalid
 */
export function extractPlaylistId(url) {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    
    // Handle different YouTube URL formats
    if (urlObj.hostname.includes('youtube.com')) {
      // Format: https://www.youtube.com/playlist?list=PLAYLIST_ID
      const searchParams = new URLSearchParams(urlObj.search);
      const playlistId = searchParams.get('list');
      
      if (playlistId) {
        return playlistId;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

/**
 * Fetch playlist details from YouTube API
 * @param {string} playlistId - YouTube playlist ID
 * @param {string} apiKey - YouTube Data API key
 * @returns {Promise<Object>} - Playlist details
 */
export async function fetchPlaylistDetails(playlistId, apiKey) {
  if (!playlistId || !apiKey) {
    throw new Error('Playlist ID and API key are required');
  }
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to fetch playlist details');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Playlist not found');
    }
    
    const playlist = data.items[0];
    
    return {
      id: playlistId,
      title: playlist.snippet.title,
      description: playlist.snippet.description,
      thumbnail: playlist.snippet.thumbnails?.high?.url || playlist.snippet.thumbnails?.default?.url,
      publishedAt: playlist.snippet.publishedAt,
      channelId: playlist.snippet.channelId,
      channelTitle: playlist.snippet.channelTitle
    };
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    throw error;
  }
}

/**
 * Fetch videos from a YouTube playlist
 * @param {string} playlistId - YouTube playlist ID
 * @param {string} apiKey - YouTube Data API key
 * @param {number} maxResults - Maximum number of videos to fetch (default: 50)
 * @returns {Promise<Array>} - Array of video objects
 */
export async function fetchPlaylistVideos(playlistId, apiKey, maxResults = 50) {
  if (!playlistId || !apiKey) {
    throw new Error('Playlist ID and API key are required');
  }
  
  try {
    const videos = [];
    let nextPageToken = null;
    
    do {
      const pageQuery = nextPageToken ? `&pageToken=${nextPageToken}` : '';
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${Math.min(maxResults, 50)}&playlistId=${playlistId}&key=${apiKey}${pageQuery}`
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to fetch playlist videos');
      }
      
      const data = await response.json();
      nextPageToken = data.nextPageToken;
      
      // Process videos
      for (const item of data.items) {
        if (item.snippet.title !== 'Deleted video' && item.snippet.title !== 'Private video') {
          const videoId = item.contentDetails.videoId || item.snippet.resourceId?.videoId;
          
          if (videoId) {
            videos.push({
              videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              publishedAt: item.snippet.publishedAt,
              position: item.snippet.position
            });
          }
        }
      }
      
      // Break if we've reached the maximum number of videos
      if (videos.length >= maxResults) {
        break;
      }
    } while (nextPageToken);
    
    // Fetch additional video details (duration, etc.)
    if (videos.length > 0) {
      await enrichVideosWithDetails(videos, apiKey);
    }
    
    return videos;
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    throw error;
  }
}

/**
 * Fetch details for a single YouTube video
 * @param {string} videoId - YouTube video ID
 * @param {string} apiKey - YouTube Data API key
 * @returns {Promise<Object>} - Video details
 */
export async function fetchVideoDetails(videoId, apiKey) {
  if (!videoId || !apiKey) {
    throw new Error('Video ID and API key are required');
  }
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to fetch video details');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }
    
    const video = data.items[0];
    
    return {
      id: `v${Date.now()}`, // Generate a unique ID
      videoId: videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: video.snippet.publishedAt,
      channelId: video.snippet.channelId,
      channelName: video.snippet.channelTitle,
      duration: formatDuration(video.contentDetails.duration),
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
}

/**
 * Enrich video objects with additional details (duration, etc.)
 * @param {Array} videos - Array of video objects
 * @param {string} apiKey - YouTube Data API key
 * @returns {Promise<void>}
 */
async function enrichVideosWithDetails(videos, apiKey) {
  if (!videos || videos.length === 0 || !apiKey) {
    return;
  }
  
  try {
    // Process videos in batches of 50 (API limit)
    for (let i = 0; i < videos.length; i += 50) {
      const batch = videos.slice(i, i + 50);
      const videoIds = batch.map(video => video.videoId).join(',');
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`
      );
      
      if (!response.ok) {
        console.error('Failed to fetch video details');
        continue;
      }
      
      const data = await response.json();
      
      if (!data.items) {
        continue;
      }
      
      // Update video objects with additional details
      for (const item of data.items) {
        const video = batch.find(v => v.videoId === item.id);
        
        if (video) {
          video.duration = formatDuration(item.contentDetails.duration);
          video.viewCount = item.statistics?.viewCount;
          video.likeCount = item.statistics?.likeCount;
        }
      }
    }
  } catch (error) {
    console.error('Error enriching videos with details:', error);
  }
}

/**
 * Format ISO 8601 duration to human-readable format (e.g., PT1H30M15S -> 1:30:15)
 * @param {string} isoDuration - ISO 8601 duration string
 * @returns {string} - Formatted duration
 */
function formatDuration(isoDuration) {
  if (!isoDuration) return '';
  
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
  if (!match) return '';
  
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
