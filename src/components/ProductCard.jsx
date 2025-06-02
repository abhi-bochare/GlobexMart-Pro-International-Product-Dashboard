import { useState } from "react";

export default function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const { title, category, basePrice, baseCurrency, origin, rating, media } =
    product;

  return (
    <div className="border rounded-xl shadow p-4 flex flex-col gap-2 w-full sm:w-[300px]">
      <img
        src={media?.image || "/fallback.jpg"}
        alt={title}
        className="h-48 w-full object-cover rounded"
      />
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-600">Category: {category}</div>
      <div className="text-sm text-gray-600">Origin: {origin}</div>
      <div className="text-sm">
        Price: {baseCurrency} {basePrice}
      </div>
      <div className="text-sm">Rating: ⭐ {rating}</div>

      {expanded && media?.videoReview && (
        <iframe
          className="w-full h-52 mt-2 rounded"
          src={media.videoReview}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Review"
        ></iframe>
      )}

      <button
        className="text-blue-500 text-sm mt-1 underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
}
