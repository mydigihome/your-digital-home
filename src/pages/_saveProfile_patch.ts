  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    // Update profiles table with ALL fields
    await (supabase as any).from("profiles").upsert({
      id: user.id,
      full_name: profileData.full_name,
      handle: profileData.handle,
      location: profileData.location,
      updated_at: new Date().toISOString(),
    } as any);

    // Sync full_name into Supabase Auth metadata so greeting updates immediately everywhere
    if (profileData.full_name) {
      await supabase.auth.updateUser({
        data: { full_name: profileData.full_name },
      });
    }

    // Update email if changed
    if (profileData.email !== user.email) {
      await supabase.auth.updateUser({ email: profileData.email });
    }

    setSaving(false);
    toast.success("Profile saved! Your name has been updated across the app.");
  };