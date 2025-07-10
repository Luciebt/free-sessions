import React from "react";
import { Therapist } from "types/Therapist";
import { Link } from "react-router-dom";
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
  return (
    <Link
      to={`/therapist/${therapist.id}`}
      className="bg-white rounded-lg shadow-md p-6 m-4 w-72 min-h-72 flex flex-col justify-between text-left cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out hover:bg-accent"
    >
      <div>
        <h3 className="text-primary text-2xl font-semibold mb-2">
          {therapist.fullName}
        </h3>
        <p className="text-text text-base mb-4 flex-grow">{therapist.bio}</p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaStar className="mr-2 text-primary text-lg" />{" "}
          {therapist.specialties.join(", ")}
        </p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaUsers className="mr-2 text-primary text-lg" />
          {therapist.targetGroups.join(", ")}
        </p>
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
      <div className="flex flex-wrap gap-2 mt-4">
        {therapist.languages.length > 0 && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-xs font-medium">
            <FaLanguage className="mr-1" /> {therapist.languages.join(", ")}
          </div>
        )}
        {therapist.location.city && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-xs font-medium">
            <FaMapMarkerAlt className="mr-1" /> {therapist.location.city},{" "}
            {therapist.location.country}
          </div>
        )}
        {therapist.location.onlineOnly && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-xs font-medium">
            <FaGlobe className="mr-1" /> Online Only
          </div>
        )}
      </div>
    </Link>
  );
};

