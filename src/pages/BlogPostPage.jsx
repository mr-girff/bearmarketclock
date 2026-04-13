import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Bear Market Clock`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", post.description);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐻</div>
          <h1 className="text-2xl font-bold text-white mb-2">Post Not Found</h1>
          <Link to="/blog" className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_POSTS.filter(p => p.slug !== slug && p.tags.some(t => post.tags.includes(t))).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-slate-300">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{post.title}</span>
        </nav>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-slate-500">{post.category}</span>
            <span className="text-xs text-slate-500">· {post.date}</span>
            <span className="text-xs text-slate-500">· {post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-slate-400 text-lg">{post.description}</p>
        </div>
        <div className="prose-blog text-slate-300 leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs text-slate-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-10 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <Link to="/" className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
            <span className="text-2xl mb-2">🐻</span>
            <span className="text-white text-sm font-medium">Live Bear Clock</span>
          </Link>
          <Link to="/dca-calculator" className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-white text-sm font-medium">DCA Calculator</span>
          </Link>
          <Link to="/bottom-indicators" className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
            <span className="text-2xl mb-2">📡</span>
            <span className="text-white text-sm font-medium">Bottom Indicators</span>
          </Link>
        </div>
        {related.length > 0 && (
          <div>
            <h2 className="text-white font-bold text-xl mb-4">Related Articles</h2>
            <div className="space-y-4">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all group">
                  <div className="text-white font-medium mb-1 group-hover:text-red-400 transition-colors">{r.title}</div>
                  <div className="text-slate-400 text-sm">{r.description}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
