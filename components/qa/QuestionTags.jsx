import React from 'react';
import Link from 'next/link';
import { Tag as TagIcon } from 'lucide-react';

export default function QuestionTags({ tags }) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <Link
          href={`/qa/tag/${encodeURIComponent(tag)}`}
          key={tag}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors"
        >
          <TagIcon className="h-3 w-3 mr-1" />
          {tag}
        </Link>
      ))}
    </div>
  );
}
