import React, { useState } from "react";
import profilesData from "../data/profiles.json";
import ProfileCard from "../components/ProfileCard";
import SearchBar from "../components/SearchBar";
import AllApplicantsMap from "../components/AllApplicantsMap"; // ✅ Import AllApplicantsMap to display map on page

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter profiles based on search input
  const filteredProfiles = profilesData.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profiles</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {/* Display the AllApplicantsMap component below the profiles */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">View All Applicants on Map</h2>
        <AllApplicantsMap profiles={filteredProfiles} />
      </div>
    </div>
  );
};

export default HomePage;
