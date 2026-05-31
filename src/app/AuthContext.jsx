import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { DEMO_USER, isDemoAuthStored, setDemoAuthStored } from "./demoStore.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [demo, setDemo] = useState(() => isDemoAuthStored());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // ── Actions ─────────────────────────────────────────────────────────
  const signUp = ({ email, password, firstName, lastName }) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });

  const signIn = ({ email, password }) =>
    supabase.auth.signInWithPassword({ email, password });

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    });

  const startDemo = () => {
    setDemoAuthStored(true);
    setDemo(true);
    setSession(null);
  };

  const signOut = async () => {
    if (demo) {
      setDemoAuthStored(false);
      setDemo(false);
      return { error: null };
    }
    return supabase.auth.signOut();
  };

  const value = {
    session,
    user: demo ? DEMO_USER : session?.user ?? null,
    loading,
    isConfigured: isSupabaseConfigured,
    isDemo: demo,
    signUp,
    signIn,
    signInWithGoogle,
    startDemo,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
