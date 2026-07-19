import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

interface ColorSwatch {
  shade: string;
  hex: string;
  note?: string;
}

interface ColorPalette {
  name: string;
  key: string;
  colors: ColorSwatch[];
}

function RouteComponent() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const designSystem: ColorPalette[] = [
    {
      name: "Red",
      key: "red",
      colors: [
        { shade: "50", hex: "#fef2f2" },
        { shade: "100", hex: "#fee2e2" },
        { shade: "200", hex: "#fecaca" },
        { shade: "300", hex: "#fca5a5" },
        { shade: "400", hex: "#f87171" },
        { shade: "500", hex: "#ef4444" },
        { shade: "600", hex: "#dc2626" },
        {
          shade: "700",
          hex: "#dc2626",
          note: "Duplicate of 600 in design graphic",
        },
        { shade: "800", hex: "#991b1b" },
        { shade: "900", hex: "#7f1d1d" },
        { shade: "950", hex: "#450a0a" },
      ],
    },
    {
      name: "Blue",
      key: "blue",
      colors: [
        { shade: "50", hex: "#eff6ff" },
        { shade: "100", hex: "#dbeafe" },
        { shade: "200", hex: "#bedbff" },
        { shade: "300", hex: "#8ec5ff" },
        { shade: "400", hex: "#50a2ff" },
        { shade: "500", hex: "#2b7fff" },
        { shade: "600", hex: "#155dfc" },
        {
          shade: "700",
          hex: "#1447e6",
          note: "Labeled as #cc3a5b (typo) in graphic",
        },
        { shade: "800", hex: "#193cb8" },
        { shade: "900", hex: "#1c398e" },
        { shade: "950", hex: "#162456" },
      ],
    },
    {
      name: "Emerald",
      key: "emerald",
      colors: [
        { shade: "50", hex: "#ecfdf5" },
        { shade: "100", hex: "#d0fae5" },
        { shade: "200", hex: "#a4f4cf" },
        { shade: "300", hex: "#5ee9b5" },
        { shade: "400", hex: "#00d492" },
        { shade: "500", hex: "#00bc7d" },
        { shade: "600", hex: "#009966" },
        { shade: "700", hex: "#007a55" },
        { shade: "800", hex: "#006045" },
        { shade: "900", hex: "#004f3b" },
        { shade: "950", hex: "#002c22" },
      ],
    },
    {
      name: "Yellow",
      key: "yellow",
      colors: [
        { shade: "50", hex: "#fefce8" },
        { shade: "100", hex: "#fef9c3" },
        { shade: "200", hex: "#fef08a" },
        { shade: "300", hex: "#fde047" },
        { shade: "400", hex: "#facc15" },
        { shade: "500", hex: "#eab308" },
        { shade: "600", hex: "#ca8a04" },
        { shade: "700", hex: "#a16207" },
        { shade: "800", hex: "#854d0e" },
        { shade: "900", hex: "#713f12" },
        { shade: "950", hex: "#422006" },
      ],
    },
    {
      name: "Gray",
      key: "gray",
      colors: [
        { shade: "50", hex: "#f9fafb" },
        { shade: "100", hex: "#f3f4f6" },
        { shade: "200", hex: "#e5e7eb" },
        { shade: "300", hex: "#cbd5e1" },
        { shade: "400", hex: "#9ca3af" },
        { shade: "500", hex: "#6b7280" },
        { shade: "600", hex: "#4b5563" },
        { shade: "700", hex: "#374151" },
        { shade: "800", hex: "#1f2937" },
        { shade: "900", hex: "#111827" },
        { shade: "950", hex: "#030712" },
      ],
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-sans selection:bg-blue-500 selection:text-white pb-20">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-gray-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Tailwind CSS v4
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Design System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Elevate Brand Colors
            </h1>
            <p className="mt-3 text-lg text-gray-400 max-w-2xl">
              An interactive color playground showcasing the custom design
              system colors integrated directly into our Tailwind theme.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-gray-900 border border-gray-800 rounded-xl">
            <span className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm border border-gray-700/50">
              Dark Theme
            </span>
            <span className="px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
              Light Theme
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Palette Section */}
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-blue-500" />
              Palette Families
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Click on any swatch to copy its hexadecimal code.
            </p>
          </div>

          <div className="space-y-8">
            {designSystem.map((palette) => (
              <div
                key={palette.key}
                className="p-6 bg-gray-900/40 border border-gray-900 rounded-2xl backdrop-blur-md hover:border-gray-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {palette.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {palette.colors.length} shades
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
                  {palette.colors.map((color) => {
                    // Determine text color for visual accessibility inside the card
                    const isLightShade =
                      parseInt(color.shade) <= 400 ||
                      (palette.key === "yellow" &&
                        parseInt(color.shade) <= 500);

                    // Tailwind class mapping helper
                    const bgClass = `bg-${palette.key}-${color.shade}`;
                    const textClass = isLightShade
                      ? "text-gray-950"
                      : "text-white";

                    return (
                      <button
                        key={color.shade}
                        onClick={() => handleCopy(color.hex)}
                        className={`group relative flex flex-col justify-between p-3 h-28 rounded-xl ${bgClass} ${textClass} text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        title={`Copy ${color.hex}`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className="text-xs font-bold tracking-wider opacity-85 group-hover:scale-105 transition-transform duration-200">
                            {color.shade}
                          </span>
                          {color.note && (
                            <span
                              className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"
                              title={color.note}
                            />
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase tracking-wider font-mono opacity-70 block">
                            {color.hex}
                          </span>
                          {color.note && (
                            <span className="text-[8px] font-medium leading-none block opacity-75 truncate max-w-full">
                              * Custom
                            </span>
                          )}
                        </div>

                        {/* Copy overlay effect */}
                        <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-sm pointer-events-none`}
                          >
                            Copy Hex
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Component Showcase Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-emerald-500" />
              Tailwind v4 Integration Preview
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Sample components rendered using our design system color
              variables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Interactive Buttons & Badges */}
            <div className="p-6 bg-gray-900/20 border border-gray-900 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3">
                Buttons & Badges
              </h3>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 cursor-pointer">
                    Primary Button
                  </button>
                  <button className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-200 cursor-pointer">
                    Success Button
                  </button>
                  <button className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl shadow-lg shadow-red-900/20 transition-all duration-200 cursor-pointer">
                    Danger Button
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 text-sm font-semibold text-gray-950 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-xl transition-all duration-200 cursor-pointer">
                    Warning Button
                  </button>
                  <button className="px-5 py-2.5 text-sm font-semibold text-gray-200 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-xl transition-all duration-200 cursor-pointer">
                    Muted Button
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Badges
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25">
                    Info Tag
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    Completed
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/25">
                    Attention
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-400 border border-red-500/25">
                    Error
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-800 text-gray-300">
                    System
                  </span>
                </div>
              </div>
            </div>

            {/* Contextual Feedback & Notes */}
            <div className="p-6 bg-gray-900/20 border border-gray-900 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3">
                Feedback UI Cards
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold font-mono">
                    i
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold text-blue-200">
                      Theme Information
                    </h5>
                    <p className="text-xs text-blue-300/80 mt-1 leading-relaxed">
                      Custom theme overrides are declared in index.css inside
                      the @theme block. Tailwind v4 automatically builds the
                      corresponding utilities.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-yellow-950/20 border border-yellow-900/40 flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs flex items-center justify-center font-bold font-mono">
                    !
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold text-yellow-200">
                      Graphic Discrepancy Resolved
                    </h5>
                    <p className="text-xs text-yellow-300/80 mt-1 leading-relaxed">
                      The original design graphic labeled Blue-700 as #cc3a5b
                      (crimson) and Red-700 as #dc2626 (duplicate of 600). We
                      mapped their actual visual colors in the configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Clipboard Notification */}
      {copiedColor && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-white">
            Copied{" "}
            <code className="text-xs font-mono bg-gray-800 px-1.5 py-0.5 rounded text-emerald-400">
              {copiedColor}
            </code>{" "}
            to clipboard
          </span>
        </div>
      )}
    </div>
  );
}
