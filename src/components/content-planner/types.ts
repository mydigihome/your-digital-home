// Content planner types
export interface ContentPost {
  id: string;
  user_id: string;
  title: string;
  caption: string | null;
  platform: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduled_date: string | null;
  hashtags: string[];
  media_url: string | null;
  created_at: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  description: string | null;
  platform: string;
  category: string;
  status: 'idea' | 'in_progress' | 'ready';
}

export type PlatformType = 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'substack';

export const PLATFORMS: PlatformType[] = ['instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'substack'];
