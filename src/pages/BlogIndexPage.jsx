import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogPosts";

const CATEGORY_COLORS = {
  Analysis: "bg-blue-500/20 text-blue-400",
  Strategy: "bg-green-500/20 text-green-400",
  Tools: "bg-purple-500/20 text-purple-400",
  Research: "bg-orange-500/20 text-orange-400",
};

export default function BlogIndexPage() {
  useEffect(() => {
    document.title = "Bitcoin Bear Market Blog — Analysis, Strategy & Research";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Bitcoin bear market analysis, DCA strategies, on-chain research, and investment guides.");
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Blog</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin Bear Market Blog</h1>
        <p className="text-slate-400 text-lg mb-10">Research, analysis, and strategies for navigating Bitcoin bear markets.</p>
        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[post.category] || "bg-white/10 text-slate-300"}`}>{post.category}</span>
                <span className="text-xs text-slate-500">{post.date}</span>
                <span className="text-xs text-slate-500">· {post.readTime}</span>
              </div>
              <h2 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors">{post.title}</h2>
              <p className="text-slate-400 text-sm">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
