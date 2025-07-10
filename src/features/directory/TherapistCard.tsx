import React from "react";
import { Therapist } from "types/Therapist";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import {
  FaLanguage,
  FaStar,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarCheck,
  FaLink,
} from "react-icons/fa";

interface TherapistCardProps {
  therapist: Therapist;
}

export const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/therapist/${therapist.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 w-72 min-h-72 flex flex-col justify-between text-left">
      <div>
        <h3 className="text-primary text-2xl font-semibold mb-2">
          {therapist.fullName}
        </h3>
        <p className="text-text text-base mb-4 flex-grow">{therapist.bio}</p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaLanguage className="mr-2 text-primary text-lg" />
          {therapist.languages.join(", ")}
        </p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaStar className="mr-2 text-primary text-lg" />
          {therapist.specialties.join(", ")}
        </p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaUsers className="mr-2 text-primary text-lg" />
          {therapist.targetGroups.join(", ")}
        </p>
        {therapist.location.city && (
          <p className="text-lightText text-sm mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-primary text-lg" />
            <strong>
              {therapist.location.city}, {therapist.location.country}
            </strong>
          </p>
        )}
        {therapist.location.onlineOnly && (
          <p className="text-lightText text-sm mb-2 flex items-center">
            <FaGlobe className="mr-2 text-primary text-lg" />
            <strong>Online only</strong>
          </p>
        )}
        {therapist.busy !== undefined && (
          <p className="text-lightText text-sm mb-2 flex items-center">
            <FaCalendarCheck className="mr-2 text-primary text-lg" />
            {therapist.busy ? "Busy" : "Available"}
          </p>
        )}
        {therapist.personalLink && (
          <p className="text-lightText text-sm mb-2 flex items-center">
            <FaLink className="mr-2 text-primary text-lg" />
            <a
              href={therapist.personalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Link
            </a>
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={handleViewMore} className="w-full">
          View Profile
        </Button>
      </div>
    </div>
  );
};
