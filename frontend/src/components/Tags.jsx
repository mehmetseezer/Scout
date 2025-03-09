import React, { useEffect, useState } from "react";
import { FiTag } from "react-icons/fi";

const Tags = ({ tags, maxVisibleTags }) => {
    const [visibleTags, setVisibleTags] = useState(tags.slice(0, maxVisibleTags));
    const [remainingTags, setRemainingTags] = useState(tags.length - maxVisibleTags);

    // Ekran genişliğine göre dinamik tag sayısı belirle
    useEffect(() => {
        const handleResize = () => {
            let newMaxVisibleTags = maxVisibleTags;

            if (window.innerWidth < 640) { // Mobil cihazlar
                newMaxVisibleTags = 2;
            } else if (window.innerWidth < 1024) { // Tabletler
                newMaxVisibleTags = 3;
            } else { // Büyük ekranlar
                newMaxVisibleTags = maxVisibleTags;
            }

            setVisibleTags(tags.slice(0, newMaxVisibleTags));
            setRemainingTags(tags.length - newMaxVisibleTags);
        };

        // İlk yüklemede ekran genişliğini kontrol et
        handleResize();

        // Ekran boyutu değiştiğinde yeniden kontrol et
        window.addEventListener("resize", handleResize);

        // Temizleme fonksiyonu
        return () => window.removeEventListener("resize", handleResize);
    }, [tags, maxVisibleTags]);

    return (
        <div className="flex gap-2 flex-wrap">
            {visibleTags.map((tag) => (
                <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs flex items-center"
                >
                    <FiTag className="mr-1 text-red-500" />
                    {tag}
                </span>
            ))}
            {remainingTags > 0 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs flex items-center">
                    +{remainingTags}
                </span>
            )}
        </div>
    );
};

export default Tags;