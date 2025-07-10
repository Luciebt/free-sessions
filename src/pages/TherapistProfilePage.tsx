import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Therapist } from "../types/Therapist";
import { getTherapist, updateTherapist } from "../services/therapistService";
import { useAuth } from "../features/auth/AuthContext";
import Button from "../components/common/Button";
import {
  FaLanguage,
  FaStar,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarCheck,
  FaLink,
} from "react-icons/fa";

const TherapistProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();
  const isAdmin =
    session && session.user.email === process.env.REACT_APP_ADMIN_EMAIL;

  useEffect(() => {
    if (id) {
      getTherapist(id)
        .then((data) => {
          setTherapist(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch therapist:", err);
          setError("Therapist not found or an error occurred.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleApprove = async () => {
    if (therapist) {
      await updateTherapist(therapist.id, { approved: true });
      setTherapist((prev) => (prev ? { ...prev, approved: true } : null));
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-background min-h-[calc(100vh-120px)] flex flex-col items-center justify-start">
        Loading therapist profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-background min-h-[calc(100vh-120px)] flex flex-col items-center justify-start">
        {error}
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="p-6 bg-background min-h-[calc(100vh-120px)] flex flex-col items-center justify-start">
        Therapist not found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-[calc(100vh-120px)] flex flex-col items-center justify-start">
      <div className="bg-accent rounded-lg p-6 w-full max-w-4xl text-left">
        <h1 className="text-primary text-3xl font-bold mb-4">
          {therapist.fullName}
        </h1>
        <p className="text-text text-base leading-relaxed mb-6">
          {therapist.bio}
        </p>
        <p className="text-text text-base mb-2 flex items-center">
          <FaLanguage className="mr-2 text-primary" />
          {therapist.languages.join(", ")}
        </p>
        <p className="text-text text-base mb-2 flex items-center">
          <FaStar className="mr-2 text-primary" />
          {therapist.specialties.join(", ")}
        </p>
        <p className="text-text text-base mb-2 flex items-center">
          <FaUsers className="mr-2 text-primary" />
          {therapist.targetGroups.join(", ")}
        </p>
        {therapist.location.city && (
          <p className="text-text text-base mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-primary" />{" "}
            {therapist.location.city}, {therapist.location.country}
          </p>
        )}
        {therapist.location.onlineOnly && (
          <p className="text-text text-base mb-2 flex items-center">
            <FaGlobe className="mr-2 text-primary" />{" "}
            <strong>Online only</strong>
          </p>
        )}
        {therapist.busy !== undefined && (
          <p className="text-text text-base mb-2 flex items-center">
            <FaCalendarCheck className="mr-2 text-primary" />{" "}
            {therapist.busy ? "Busy" : "Available"}
          </p>
        )}
        {therapist.personalLink && (
          <p className="text-text text-base mb-2 flex items-center">
            <FaLink className="mr-2 text-primary" />
            <strong>Website: </strong>{" "}
            <a
              href={therapist.personalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {therapist.personalLink}
            </a>
          </p>
        )}
        <Button
          onClick={() => window.open(therapist.schedulingLink, "_blank")}
          disabled={!therapist.schedulingLink}
          className="w-full py-3 text-lg mt-8"
        >
          Book a Session
        </Button>

        {isAdmin && !therapist.approved && (
          <Button
            onClick={handleApprove}
            variant="secondary"
            className="w-full py-3 text-lg mt-4"
          >
            Approve Therapist
          </Button>
        )}
      </div>
    </div>
  );
};

export default TherapistProfilePage;
