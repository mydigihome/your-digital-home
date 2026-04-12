import { useStudioProfile } from "@/hooks/useStudio";

export default function SetupTab() {
  const { data: profile } = useStudioProfile();
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Studio Setup</h3>
      <p className="text-sm text-muted-foreground">Configure your studio profile and connected platforms in the Studio tab.</p>
    </div>
  );
}
