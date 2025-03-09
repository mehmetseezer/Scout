import React from 'react';
import { Range } from 'react-range';

const BlogFilters = ({ tempFilters, handleFilterChange, handleReadTimeChange, applyFilters }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-row-1 md:grid-row-3 gap-6">
                {/* Sıralama */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="sortBy" className="text-sm font-medium text-gray-600">Sırala:</label>
                    <select
                        id="sortBy"
                        name="sortBy"
                        value={tempFilters.sortBy}
                        onChange={handleFilterChange}
                        className="border border-gray-200 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors"
                    >
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                    </select>
                </div>

                {/* Okuma Süresi */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-600">Okuma Süresi (dk):</label>
                    <Range
                        values={tempFilters.readTime}
                        step={1}
                        min={0}
                        max={60}
                        onChange={handleReadTimeChange}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                className="h-1.5 bg-gray-200 rounded-full"
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                className="h-4 w-4 bg-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                            />
                        )}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{tempFilters.readTime[0]} dk</span>
                        <span>{tempFilters.readTime[1]} dk</span>
                    </div>
                </div>

                {/* Kelime Arama */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="search" className="text-sm font-medium text-gray-600">Kelime Ara:</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={tempFilters.search}
                        onChange={handleFilterChange}
                        placeholder="Blog ara..."
                        className="border border-gray-200 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-center md:justify-end">
                <button
                    onClick={applyFilters}
                    className="bg-red-500 hover:bg-red-600 text-white w-full font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                >
                    Filtrele
                </button>
            </div>
        </div>
    );
};

export default BlogFilters;