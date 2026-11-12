import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Heart, 
  MessageSquare, 
  Share2, 
  Search, 
  MapPin, 
  Sparkles, 
  X, 
  Send,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { CommunityPost } from '../../types/farm';

export const CommunityForumView: React.FC = () => {
  const { communityPosts, addCommunityPost, likeCommunityPost, addPostReply, profile } = useFarm();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // New Post Form States
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [cropTag, setCropTag] = useState('Paddy');
  const [topicTag, setTopicTag] = useState<'Pest Control' | 'Organic Farming' | 'Irrigation' | 'Market Price' | 'Machinery' | 'Government Subsidy'>('Organic Farming');
  const [postImageUrl, setPostImageUrl] = useState('');

  const topics = ['All', 'Pest Control', 'Organic Farming', 'Irrigation', 'Market Price', 'Machinery', 'Government Subsidy'];

  const filteredPosts = communityPosts.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || p.topicTag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    addCommunityPost({
      authorName: profile.name,
      authorLocation: `${profile.locationVillage}, ${profile.district}`,
      authorRole: 'Progressive Farmer',
      title: postTitle,
      content: postContent,
      cropTag,
      topicTag,
      imageUrl: postImageUrl.trim() ? postImageUrl : undefined
    });

    setPostTitle('');
    setPostContent('');
    setPostImageUrl('');
    setIsCreatingPost(false);
  };

  const handleSendReply = (postId: string) => {
    const text = replyTextMap[postId]?.trim();
    if (!text) return;
    addPostReply(postId, text);
    setReplyTextMap(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Indian Farmers Community & Knowledge Exchange
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Connect with grassroots growers across Tamil Nadu and Indian states to share pest solutions, yields, and machinery tips
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreatingPost(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Ask Question / Share Experience</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search discussions by topic, pest name, organic formulation, or state..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Topic Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-bold shrink-0">Topic:</span>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                selectedTag === t
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {isCreatingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              type="button"
              onClick={() => setIsCreatingPost(false)}
              className="absolute right-5 top-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-xl text-stone-900 dark:text-stone-100 font-serif mb-1">
              Start a Farmer Discussion
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
              Posting as <strong>{profile.name}</strong> from {profile.locationVillage}, {profile.district}
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Trichoderma treatment for seedling wilt in paddy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Crop
                  </label>
                  <select
                    value={cropTag}
                    onChange={(e) => setCropTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                  >
                    <option value="Paddy">Paddy / Rice</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="General">General Agriculture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Topic Category
                  </label>
                  <select
                    value={topicTag}
                    onChange={(e) => setTopicTag(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                  >
                    <option value="Organic Farming">Organic Farming</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Market Price">Market Price</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Government Subsidy">Government Subsidy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Your Question or Experience *
                </label>
                <textarea
                  rows={4}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Describe what you observed in your field, results of a technique, or questions for fellow farmers..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Crop Photograph URL (Optional)
                </label>
                <input
                  type="url"
                  value={postImageUrl}
                  onChange={(e) => setPostImageUrl(e.target.value)}
                  placeholder="https://example.com/field-photo.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
                >
                  Publish to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discussion Posts Stream */}
      <div className="space-y-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition space-y-4"
          >
            {/* Author info */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-lime-300 font-extrabold flex items-center justify-center text-sm shrink-0">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {post.authorName}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {post.authorRole} • <span className="text-emerald-700 dark:text-emerald-400">{post.authorLocation}</span> • {post.timestamp}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {post.cropTag}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {post.topicTag}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white mb-1.5 font-serif">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Attached Photo if present */}
            {post.imageUrl && (
              <div className="rounded-2xl overflow-hidden max-h-72 border border-stone-200 dark:border-stone-800">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Like and Reply Bar */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => likeCommunityPost(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition ${
                    post.likedByMe ? 'text-rose-600' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{post.likesCount} Helpful</span>
                </button>

                <span className="flex items-center gap-1.5 font-semibold text-stone-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies.length} Replies</span>
                </span>
              </div>
            </div>

            {/* Replies section */}
            {post.replies.length > 0 && (
              <div className="pl-4 border-l-2 border-emerald-500/40 space-y-2 pt-2">
                {post.replies.map((rep) => (
                  <div key={rep.id} className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-stone-900 dark:text-stone-100">{rep.authorName}</span>
                      <span className="text-[10px] text-stone-400">{rep.timestamp}</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 leading-snug">{rep.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={replyTextMap[post.id] || ''}
                onChange={(e) => setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendReply(post.id);
                  }
                }}
                placeholder="Write a helpful advice reply or question..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => handleSendReply(post.id)}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shrink-0"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
