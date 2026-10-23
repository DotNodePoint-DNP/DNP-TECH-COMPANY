"use client";

import { useEffect, useState } from "react";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: "superadmin" | "companyadmin";
  status: boolean;
};

type Stats = {
  totalAdmins: number;
  activeAdmins: number;
  totalProducts: number;
  totalQueries: number;
  totalMeetings: number;
  totalPartnerships: number;
  totalApplications: number;
};

type Application = {
  _id: string;
  applicantName: string;
  email: string;
  phone: string;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt: string;
  career?: {
    title: string;
  };
};

type Meeting = {
  _id: string;
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  subject: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  technologies: string;
  productUrl?: string;
  status: boolean;
  createdAt: string;
};

type Partnership = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  partnershipType: string;
  subject: string;
  status: "New" | "Contacted" | "In Progress" | "Completed" | "Rejected";
  createdAt: string;
};

export default function DashboardPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [partnershipsLoading, setPartnershipsLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
    fetchStats();
    fetchApplications();
    fetchMeetings();
    fetchProducts();
    fetchPartnerships();
  }, []);

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin", {
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch admins");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setAdmins(data);
      } else if (Array.isArray(data.admins)) {
        setAdmins(data.admins);
      } else {
        setAdmins([]);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const response = await fetch("/api/admin/stats", {
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);

      const response = await fetch("/api/applications", {
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setApplications(data);
      } else if (Array.isArray(data.applications)) {
        setApplications(data.applications);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    } finally {
      setApplicationsLoading(false);
    }
  };

  // Fetch meetings
  const fetchMeetings = async () => {
    try {
      setMeetingsLoading(true);

      const response = await fetch("/api/meetings", {
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setMeetings(data);
      } else if (Array.isArray(data.meetings)) {
        setMeetings(data.meetings);
      } else {
        setMeetings([]);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
      setMeetings([]);
    } finally {
      setMeetingsLoading(false);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      const response = await fetch("/api/products", {
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch partnerships
  const fetchPartnerships = async () => {
    try {
      setPartnershipsLoading(true);

      const response = await fetch("/api/partnership", {
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch partnerships");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPartnerships(data);
      } else if (Array.isArray(data.partnerships)) {
        setPartnerships(data.partnerships);
      } else {
        setPartnerships([]);
      }
    } catch (error) {
      console.error("Error fetching partnerships:", error);
      setPartnerships([]);
    } finally {
      setPartnershipsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Reviewed":
        return "bg-blue-100 text-blue-700";

      case "Shortlisted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "New":
        return "bg-blue-100 text-blue-700";

      case "Contacted":
        return "bg-purple-100 text-purple-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      // Page heading
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to the DotNode Point administration panel.
        </p>
      </div>
      // Statistics
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Admins</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statsLoading ? "..." : (stats?.totalAdmins ?? admins.length)}
          </p>

          <p className="mt-1 text-sm text-green-600">
            {statsLoading ? "Loading..." : `${stats?.activeAdmins ?? 0} active`}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Products</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statsLoading ? "..." : (stats?.totalProducts ?? products.length)}
          </p>

          <p className="mt-1 text-sm text-gray-500">Total products</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Queries</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statsLoading ? "..." : (stats?.totalQueries ?? 0)}
          </p>

          <p className="mt-1 text-sm text-gray-500">Customer queries</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Meetings</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statsLoading ? "..." : (stats?.totalMeetings ?? meetings.length)}
          </p>

          <p className="mt-1 text-sm text-gray-500">Meeting requests</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Partnerships</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statsLoading
              ? "..."
              : (stats?.totalPartnerships ?? partnerships.length)}
          </p>

          <p className="mt-1 text-sm text-gray-500">Partnership requests</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Applications</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statsLoading
              ? "..."
              : (stats?.totalApplications ?? applications.length)}
          </p>

          <p className="mt-1 text-sm text-gray-500">Job applications</p>
        </div>
      </div>
      // Recent admins
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Admins
            </h2>

            <p className="text-sm text-gray-500">
              Recently added administrators
            </p>
          </div>

          <a
            href="/admin/admins"
            className="text-sm font-medium text-[#2208b4] hover:underline"
          >
            View All
          </a>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading admins...
            </div>
          ) : admins.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No admins found.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {admins.slice(0, 5).map((admin) => (
                  <tr
                    key={admin._id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {admin.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.role}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          admin.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {admin.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      // Recent meetings and applications
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Meetings
              </h2>

              <p className="text-sm text-gray-500">Latest meeting requests</p>
            </div>

            <a
              href="/admin/meetings"
              className="text-sm font-medium text-[#2208b4] hover:underline"
            >
              View All
            </a>
          </div>

          <div className="p-6">
            {meetingsLoading ? (
              <p className="text-center text-sm text-gray-500">
                Loading meetings...
              </p>
            ) : meetings.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No meetings found.
              </p>
            ) : (
              <div className="space-y-4">
                {meetings.slice(0, 5).map((meeting) => (
                  <div
                    key={meeting._id}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {meeting.name}
                      </h3>

                      <p className="truncate text-sm text-gray-500">
                        {meeting.subject}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {meeting.date} {meeting.time}
                      </p>
                    </div>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        meeting.status,
                      )}`}
                    >
                      {meeting.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>

              <p className="text-sm text-gray-500">Latest job applications</p>
            </div>

            <a
              href="/admin/applications"
              className="text-sm font-medium text-[#2208b4] hover:underline"
            >
              View All
            </a>
          </div>

          <div className="p-6">
            {applicationsLoading ? (
              <p className="text-center text-sm text-gray-500">
                Loading applications...
              </p>
            ) : applications.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No applications found.
              </p>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((application) => (
                  <div
                    key={application._id}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {application.applicantName}
                      </h3>

                      <p className="truncate text-sm text-gray-500">
                        {application.career?.title || "Job Application"}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(application.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        application.status,
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      // Recent products and partnerships
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Products
              </h2>

              <p className="text-sm text-gray-500">Recently added products</p>
            </div>

            <a
              href="/admin/products"
              className="text-sm font-medium text-[#2208b4] hover:underline"
            >
              View All
            </a>
          </div>

          <div className="p-6">
            {productsLoading ? (
              <p className="text-center text-sm text-gray-500">
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No products found.
              </p>
            ) : (
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {product.name}
                      </h3>

                      <p className="truncate text-sm text-gray-500">
                        {product.category}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(product.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                        product.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Partnerships
              </h2>

              <p className="text-sm text-gray-500">
                Latest partnership requests
              </p>
            </div>

            <a
              href="/admin/partnership"
              className="text-sm font-medium text-[#2208b4] hover:underline"
            >
              View All
            </a>
          </div>

          <div className="p-6">
            {partnershipsLoading ? (
              <p className="text-center text-sm text-gray-500">
                Loading partnerships...
              </p>
            ) : partnerships.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No partnerships found.
              </p>
            ) : (
              <div className="space-y-4">
                {partnerships.slice(0, 5).map((partnership) => (
                  <div
                    key={partnership._id}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {partnership.name}
                      </h3>

                      <p className="truncate text-sm text-gray-500">
                        {partnership.partnershipType}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(partnership.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        partnership.status,
                      )}`}
                    >
                      {partnership.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      // Quick actions
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>

        <p className="mt-1 text-sm text-gray-500">
          Quickly access important admin sections.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/admin/products"
            className="rounded-lg border border-gray-200 p-4 transition hover:border-[#5145CD] hover:bg-[#F8F7FF]"
          >
            <h3 className="font-semibold text-gray-900">Manage Products</h3>

            <p className="mt-1 text-sm text-gray-500">
              Add or manage company products.
            </p>
          </a>

          <a
            href="/admin/careers"
            className="rounded-lg border border-gray-200 p-4 transition hover:border-[#5145CD] hover:bg-[#F8F7FF]"
          >
            <h3 className="font-semibold text-gray-900">Manage Careers</h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage available job positions.
            </p>
          </a>

          <a
            href="/admin/applications"
            className="rounded-lg border border-gray-200 p-4 transition hover:border-[#5145CD] hover:bg-[#F8F7FF]"
          >
            <h3 className="font-semibold text-gray-900">Applications</h3>

            <p className="mt-1 text-sm text-gray-500">
              Review job applications.
            </p>
          </a>

          <a
            href="/admin/meetings"
            className="rounded-lg border border-gray-200 p-4 transition hover:border-[#5145CD] hover:bg-[#F8F7FF]"
          >
            <h3 className="font-semibold text-gray-900">Meetings</h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage meeting requests.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
