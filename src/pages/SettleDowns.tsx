import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Item } from "../types";
import ItemCard from "../components/items/ItemCard";
import { toast } from "react-hot-toast";
import { Search } from "lucide-react";

export default function SettleDowns() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    status: "returned",
  });

  useEffect(() => {
    fetchSettledItems();
  }, [filter]);

  useEffect(() => {
    applySearchFilter();
  }, [items, searchTerm]);

  const fetchSettledItems = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from("items")
        .select("*")
        .eq("status", "returned")
        .order("updated_at", { ascending: false });

      if (filter.type !== "all") {
        query = query.eq("type", filter.type);
      }
      if (filter.category !== "all") {
        query = query.eq("category", filter.category);
      }

      const { data, error } = await query;
      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error("Error fetching settled items:", error);
      toast.error("Failed to load settled items");
    } finally {
      setLoading(false);
    }
  };

  const applySearchFilter = () => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">
          Settled Items
        </h1>
        <p className="text-gray-600 text-center sm:text-left">
          Browse through successfully returned items and their stories.
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search settled items..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2 w-40"
          >
            <option value="all">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2 w-40"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
            <option value="IDs">IDs</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading settled items...</div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No settled items found.</p>
        </div>
      )}
    </div>
  );
}
