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
          <FaLanguage className="mr-2 text-primary text-lg" />{" "}
          {therapist.languages.join(", ")}
        </p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaStar className="mr-2 text-primary text-lg" />{" "}
          {therapist.specialties.join(", ")}
        </p>
        <p className="text-lightText text-sm mb-2 flex items-center">
          <FaUsers className="mr-2 text-primary text-lg" />
          {therapist.targetGroups.join(", ")}
        </p>
        {therapist.location.city && (
          <p className="text-lightText text-sm mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-primary text-lg" />
            {therapist.location.city}, {therapist.location.country}
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
    </Link>
  );
};
