"use client";

import { useEffect, useState } from "react";

type Query = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied";
  createdAt: string;
};

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 10;

  const [filterStatus, setFilterStatus] = useState<
    "All" | "New" | "Read" | "Replied"
  >("All");

  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/queries", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch queries");
      }

      setQueries(data.queries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleView = async (query: Query) => {
    setSelectedQuery(query);
    setShowModal(true);
    setMessage("");

    if (query.status === "New") {
      try {
        await fetch(`/api/queries/${query._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "Read",
          }),
        });

        await fetchQueries();
      } catch (error) {
        console.error("Failed to mark query as read:", error);
      }
    }
  };

  const handleStatusChange = async (
    id: string,
    status: "New" | "Read" | "Replied",
  ) => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(`/api/queries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setMessage("Query status updated successfully.");

      if (selectedQuery?._id === id) {
        setSelectedQuery(data.query);
      }

      await fetchQueries();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this query?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(`/api/queries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete query");
      }

      setMessage("Query deleted successfully.");
      setShowModal(false);
      setSelectedQuery(null);

      await fetchQueries();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete query");
    }
  };

  const newCount = queries.filter((query) => query.status === "New").length;

  const readCount = queries.filter((query) => query.status === "Read").length;

  const repliedCount = queries.filter(
    (query) => query.status === "Replied",
  ).length;

  const filteredQueries = queries.filter((query) => {
    const matchesStatus =
      filterStatus === "All" || query.status === filterStatus;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      query.name.toLowerCase().includes(search) ||
      query.email.toLowerCase().includes(search) ||
      query.subject.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);

  const startIndex = (currentPage - 1) * queriesPerPage;

  const paginatedQueries = filteredQueries.slice(
    startIndex,
    startIndex + queriesPerPage,
  );

  const getStatusClass = (status: Query["status"]) => {
    if (status === "New") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Read") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-5 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customer Queries</h1>

          <p className="mt-1 text-sm text-gray-600">
            View and manage messages received from your website.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">Total Queries</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {queries.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">New</p>

            <p className="mt-1 text-2xl font-bold text-blue-600">{newCount}</p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">Read</p>

            <p className="mt-1 text-2xl font-bold text-yellow-600">
              {readCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">Replied</p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {repliedCount}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Received Queries
            </h2>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Search name, email, or subject..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 sm:w-64"
              />

              <div className="flex items-center gap-2">
                <label
                  htmlFor="statusFilter"
                  className="text-sm font-medium text-gray-600"
                >
                  Filter:
                </label>

                <select
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(
                      e.target.value as "All" | "New" | "Read" | "Replied",
                    );
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-blue-500"
                >
                  <option value="All">All Queries</option>
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading queries...
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-semibold text-gray-700">No queries found</p>

              <p className="mt-1 text-sm text-gray-500">
                Customer messages will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>

                    <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Subject
                    </th>

                    <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>

                    <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedQueries.map((query) => (
                    <tr
                      key={query._id}
                      className={`hover:bg-gray-50 ${
                        query.status === "New" ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <td className="px-5 py-3 text-gray-700">{query.name}</td>

                      <td className="max-w-[220px] px-5 py-3">
                        <p className="truncate font-medium text-gray-800">
                          {query.subject}
                        </p>
                      </td>

                      <td className="px-5 py-3 text-gray-700">{query.email}</td>

                      <td className="px-5 py-3 text-gray-600">
                        {new Date(query.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            query.status,
                          )}`}
                        >
                          {query.status}
                        </span>
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <button
                            onClick={() => handleView(query)}
                            className="rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                          >
                            View
                          </button>

                          {query.status === "New" && (
                            <button
                              onClick={() =>
                                handleStatusChange(query._id, "Read")
                              }
                              className="rounded-md bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
                            >
                              Mark as Read
                            </button>
                          )}

                          {query.status !== "Replied" && (
                            <button
                              onClick={() =>
                                handleStatusChange(query._id, "Replied")
                              }
                              className="rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                            >
                              Mark as Replied
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(query._id)}
                            className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-600">
            {filteredQueries.length === 0
              ? "No queries to display"
              : `Showing ${startIndex + 1}–${Math.min(
                  startIndex + queriesPerPage,
                  filteredQueries.length,
                )} of ${filteredQueries.length} queries`}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3 text-sm text-gray-700">
              Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage >= totalPages || totalPages === 0}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        {showModal && selectedQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white text-black shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Query Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Customer message details
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedQuery(null);
                  }}
                  className="rounded-lg p-2 text-2xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedQuery.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedQuery.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedQuery.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {new Date(selectedQuery.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Subject</p>

                  <p className="mt-1 rounded-lg bg-gray-50 p-4 font-semibold text-gray-900">
                    {selectedQuery.subject}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    Message
                  </p>

                  <div className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 leading-7 text-gray-800">
                    {selectedQuery.message}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    Status
                  </p>

                  <select
                    value={selectedQuery.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedQuery._id,
                        e.target.value as Query["status"],
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-500"
                  >
                    <option value="New">New</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-5">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedQuery(null);
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>

                <button
                  onClick={() => handleDelete(selectedQuery._id)}
                  className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                >
                  Delete Query
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
