const fetchUser = async () => {
  const response = await fetch(`/api/user?id=${session!.user.email}`);
  const data = await response.json();

  console.log('d', data);

  update({
    user: {
      id: data.currentUser._id,
      name: data.currentUser.name,
      description: data.currentUser.description,
      image: data.currentUser.image,
      followers: data.currentUser.followers,
      following: data.currentUser.following,
    },
  });
};

export { fetchUser };
