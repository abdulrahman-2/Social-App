import ProfilePage from "@/components/layout/ProfilePage";
import { getSingleUser, getUserPosts } from "@/lib/api";
import React from "react";

const Profile = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const singleUser = await getSingleUser(id);
  const posts = await getUserPosts(id);
  return (
    <div>
      <ProfilePage user={singleUser} posts={posts} />
    </div>
  );
};

export default Profile;
