import React, { useMemo } from 'react';
import { Quote } from 'lucide-react';

const QuoteCard = () => {
  const quotes = useMemo(() => [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
    { text: "Your only limit is your mind.", author: "Unknown" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "Don't stop until you're proud.", author: "Unknown" },
    { text: "Small steps in the right direction can turn out to be the biggest steps of your life.", author: "Unknown" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  ], []);

  const todayQuote = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return quotes[dayOfYear % quotes.length];
  }, [quotes]);

  return (
    <div className="bg-primary-500 rounded-[2rem] p-8 text-white shadow-xl shadow-primary-500/20 relative overflow-hidden group">
      <Quote className="absolute -top-4 -left-4 w-24 h-24 text-white/10 rotate-12 transition-transform group-hover:rotate-0" />
      <div className="relative z-10">
        <p className="text-lg font-black leading-tight mb-4 tracking-tight">
          "{todayQuote.text}"
        </p>
        <p className="text-[10px] font-black uppercase tracking-widest text-primary-100 opacity-80">
          — {todayQuote.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
