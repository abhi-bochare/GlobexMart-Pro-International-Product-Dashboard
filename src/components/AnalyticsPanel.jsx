import { useMemo } from "react";
import { convertCurrency } from "../utils/currency";

export default function AnalyticsPanel({ products, currency }) {
  const analytics = useMemo(() => {
    const converted = products.map((p) => ({
      ...p,
      convertedPrice: convertCurrency(p.basePrice, p.baseCurrency, currency),
    }));

    const totalValue = converted.reduce((acc, p) => acc + p.convertedPrice, 0);
    const averagePrice = (totalValue / converted.length || 0).toFixed(2);
    const mostExpensive = converted.reduce(
      (max, p) => (p.convertedPrice > max.convertedPrice ? p : max),
      { convertedPrice: 0 }
    );
    const categoryCount = {};
    const originStats = {};

    for (const p of converted) {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;

      if (!originStats[p.origin]) {
        originStats[p.origin] = { total: 0, count: 0 };
      }
      originStats[p.origin].total += p.convertedPrice;
      originStats[p.origin].count += 1;
    }

    const mostCommonCategory =
      Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    const topOrigins = Object.entries(originStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([origin]) => origin);

    const cheapestOrigin = Object.entries(originStats)
      .map(([origin, data]) => ({
        origin,
        avg: data.total / data.count,
      }))
      .sort((a, b) =>
        a.avg === b.avg ? a.origin.localeCompare(b.origin) : a.avg - b.avg
      )[0]?.origin;

    return {
      totalCount: converted.length,
      totalValue: totalValue.toFixed(2),
      averagePrice,
      mostCommonCategory,
      topOrigins,
      cheapestOrigin,
      mostExpensive,
    };
  }, [products, currency]);

  return (
    <div className="p-4 bg-white shadow rounded-xl my-4 grid gap-2 text-sm">
      <div>
        <strong>Total Products:</strong> {analytics.totalCount}
      </div>
      <div>
        <strong>Total Value ({currency}):</strong> {analytics.totalValue}
      </div>
      <div>
        <strong>Average Price:</strong> {analytics.averagePrice}
      </div>
      <div>
        <strong>Most Common Category:</strong> {analytics.mostCommonCategory}
      </div>
      <div>
        <strong>Top 3 Origins:</strong> {analytics.topOrigins.join(", ")}
      </div>
      <div>
        <strong>Cheapest Origin:</strong> {analytics.cheapestOrigin}
      </div>
      <div>
        <strong>Most Expensive Product:</strong> {analytics.mostExpensive.title}{" "}
        ({currency} {analytics.mostExpensive.convertedPrice.toFixed(2)})
      </div>
    </div>
  );
}
