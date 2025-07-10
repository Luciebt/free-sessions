import React, { useEffect, useState } from "react";
import { Therapist } from "types/Therapist";
import { getAllTherapists } from "services/therapistService";
import { TherapistCard } from "features/directory/TherapistCard";
import { useAuth } from "../features/auth/AuthContext";
import { Link } from "react-router-dom";
import { FaLanguage, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const DirectoryPage: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const [filters, setFilters] = useState({
    languages: "",
    specialties: "",
    targetGroups: "",
    onlineOnly: false,
    available: false,
    location: "",
  });

  const { session } = useAuth();
  const isAdmin =
    session && session.user.email === process.env.REACT_APP_ADMIN_EMAIL;

  const fetchAllTherapists = () => {
    getAllTherapists().then(setTherapists);
  };

  useEffect(() => {
    fetchAllTherapists();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let tempTherapists = therapists;

      if (filters.languages) {
        tempTherapists = tempTherapists.filter((t) =>
          t.languages.some((lang) =>
            lang.toLowerCase().includes(filters.languages.toLowerCase()),
          ),
        );
      }
      if (filters.specialties) {
        tempTherapists = tempTherapists.filter((t) =>
          t.specialties.some((spec) =>
            spec.toLowerCase().includes(filters.specialties.toLowerCase()),
          ),
        );
      }
      if (filters.targetGroups) {
        tempTherapists = tempTherapists.filter((t) =>
          t.targetGroups.some((group) =>
            group.toLowerCase().includes(filters.targetGroups.toLowerCase()),
          ),
        );
      }
      if (filters.onlineOnly) {
        tempTherapists = tempTherapists.filter((t) => t.location.onlineOnly);
      }
      if (filters.available) {
        tempTherapists = tempTherapists.filter((t) => !t.busy);
      }
      if (filters.location) {
        tempTherapists = tempTherapists.filter(
          (t) =>
            (t.location.city &&
              t.location.city
                .toLowerCase()
                .includes(filters.location.toLowerCase())) ||
            (t.location.country &&
              t.location.country
                .toLowerCase()
                .includes(filters.location.toLowerCase())),
        );
      }

      setFilteredTherapists(tempTherapists);
    };

    applyFilters();
  }, [therapists, filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const type = e.target.type;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const unapprovedTherapists = therapists.filter((t) => !t.approved);
  const approvedTherapists = filteredTherapists.filter((t) => t.approved);

  return (
    <div className="p-6 bg-background min-h-[calc(100vh-120px)]">
      <h2 className="text-primary text-4xl font-bold text-center mb-8">
        Therapist Directory
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-secondary text-2xl font-semibold mb-4">
          Filter Therapists
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="languages"
              className="block text-text text-sm font-medium mb-1"
            >
              Languages
            </label>
            <input
              type="text"
              id="languages"
              name="languages"
              value={filters.languages}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., English, Spanish"
            />
          </div>
          <div>
            <label
              htmlFor="specialties"
              className="block text-text text-sm font-medium mb-1"
            >
              Specialties
            </label>
            <input
              type="text"
              id="specialties"
              name="specialties"
              value={filters.specialties}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Anxiety, Depression"
            />
          </div>
          <div>
            <label
              htmlFor="targetGroups"
              className="block text-text text-sm font-medium mb-1"
            >
              Target Groups
            </label>
            <input
              type="text"
              id="targetGroups"
              name="targetGroups"
              value={filters.targetGroups}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Adults, Teenagers"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-text text-sm font-medium mb-1"
            >
              Location (City/Country)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., New York, USA"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="onlineOnly"
              name="onlineOnly"
              checked={filters.onlineOnly}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label
              htmlFor="onlineOnly"
              className="text-text text-sm font-medium"
            >
              Online Only
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={filters.available}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label
              htmlFor="available"
              className="text-text text-sm font-medium"
            >
              Available
            </label>
          </div>
        </div>
      </div>

      {isAdmin && unapprovedTherapists.length > 0 && (
        <>
          <h3 className="text-secondary text-3xl font-semibold mt-8 mb-4">
            Unapproved Therapists (Admin)
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {unapprovedTherapists.map((therapist) => (
              <Link
                key={therapist.id}
                to={`/therapist/${therapist.id}`}
                className="bg-white rounded-lg shadow-md p-4 w-64 flex flex-col justify-between text-left border-2 border-secondary cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out hover:bg-accent"
              >
                <div>
                  <h4 className="text-primary text-lg font-semibold mb-2">
                    {therapist.fullName}
                  </h4>
                  <p className="text-text text-base">{therapist.email}</p>
                </div>
              </Link>
            ))}
          </div>
          <h3 className="text-secondary text-3xl font-semibold mt-8 mb-4">
            Approved Therapists
          </h3>
        </>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {approvedTherapists.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </div>
    </div>
  );
};

export default DirectoryPage;

