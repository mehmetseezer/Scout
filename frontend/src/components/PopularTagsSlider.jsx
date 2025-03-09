import React from 'react';

const PopularTagsSlider = ({ topTags, onTagClick }) => {
  return (
    <div className="p-6 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300 border-gray-100 sticky flex overflow-x-auto gap-4 top-32">
      {/* "Tümü" butonu */}
      <button
        key="all"
        onClick={() => onTagClick("")} // Boş string göndererek tüm blogları getir
        className="px-3 py-1.5 text-nowrap border-b-2 border-transparent text-slate-400 hover:border-slate-600 hover:text-slate-600 text-sm flex items-center"
      >
        Tümü
      </button>

      {/* Diğer etiketler */}
      {topTags.length > 0 &&
        topTags.map((tag) => (
          <button
            key={tag.tag}
            onClick={() => onTagClick(tag.tag)} // Etikete tıklandığında onTagClick'i çağır
            className="px-3 py-1.5 text-nowrap border-b-2 border-transparent text-slate-400 hover:border-slate-600 hover:text-slate-600 text-sm flex items-center"
          >
            {tag.tag}
          </button>
        ))}
    </div>
  );
};

export default PopularTagsSlider;