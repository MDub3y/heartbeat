/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { motion, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: "easeOut" } 
  }
};

export default function CreateMonitorPage() {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [url, setUrl] = useState("");
  const [monitorType, setMonitorType] = useState("status");
  const [alertConfig, setAlertConfig] = useState({
    call: false,
    sms: false,
    email: true,
    push: false
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ✅ Hooked to Backend
      await apiFetch("/website", {
        method: "POST",
        body: JSON.stringify({
          url: url, // Backend validates this is a valid URL
        }),
      });

      router.push("/dashboard/monitors");
      
    } catch (error: any) {
      alert(error.message || "Failed to create monitor");
      setIsLoading(false);
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 max-w-[1040px] mx-auto pb-32"
    >
      
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="dashboard-h1 mb-2">Create monitor</h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        
        {/* SECTION 1: What to monitor */}
        <motion.div variants={itemVariants} className="flex flex-col xl:flex-row gap-8 xl:gap-14 mb-10">
            <div className="flex-1 xl:max-w-[300px] mt-2">
                <h2 className="text-white font-medium text-lg">What to monitor</h2>
                <p className="text-[#9CA3AF] text-sm mt-2 leading-relaxed">
                    Configure the target website you want to monitor. You&apos;ll find the advanced configuration below.
                </p>
            </div>

            <div className="flex-2 w-full dashboard-card p-6">
                
                {/* Alert us when */}
                <div className="mb-6">
                    <label className="dashboard-label flex items-center gap-2">
                        Alert us when
                        <Info className="w-3 h-3 text-[#555B6D]" />
                    </label>
                    <div className="relative">
                        <select 
                            value={monitorType}
                            onChange={(e) => setMonitorType(e.target.value)}
                            className="dashboard-input appearance-none cursor-pointer"
                        >
                            <option value="status">URL becomes unavailable</option>
                            <option value="keyword">URL doesn&apos;t contain keyword</option>
                            <option value="ping">Host doesn&apos;t respond to ping</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#555B6D] pointer-events-none" />
                    </div>
                    <p className="dashboard-subtext">
                        We recommend the keyword matching method. <span className="underline decoration-[#555B6D] cursor-pointer">Upgrade</span> to enable more options.
                    </p>
                </div>

                {/* URL Input */}
                <div>
                    <label className="dashboard-label flex items-center gap-2">
                        URL to monitor
                        <Info className="w-3 h-3 text-[#555B6D]" />
                    </label>
                    <div className="relative">
                        <input 
                            type="url" // ✅ Browser validation for https://
                            placeholder="https://" 
                            className="dashboard-input pr-10"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        {/* Status Indicator */}
                        <div className="absolute right-3 top-2.5 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center pointer-events-none">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                    <p className="dashboard-subtext">
                        You can import multiple monitors <span className="underline cursor-pointer">here</span>.
                    </p>
                </div>

            </div>
        </motion.div>

        {/* SECTION 2: On-call escalation */}
        <motion.div variants={itemVariants} className="flex flex-col xl:flex-row gap-8 xl:gap-14 mb-10">
            <div className="flex-1 xl:max-w-[300px] mt-2">
                <h2 className="text-white font-medium text-lg">On-call escalation</h2>
                <p className="text-[#9CA3AF] text-sm mt-2 leading-relaxed">
                    Set up rules for who&apos;s going to be notified and how when an incident occurs.
                </p>
            </div>

            <div className="flex-2 w-full dashboard-card p-6">
                
                {/* Notification Channels */}
                <div className="mb-6">
                    <label className="dashboard-label mb-3">When there&apos;s a new incident</label>
                    <div className="flex flex-wrap gap-4 items-center">
                        <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
                            <input type="checkbox" disabled className="dashboard-checkbox" />
                            <span className="text-sm text-white">Call</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
                            <input type="checkbox" disabled className="dashboard-checkbox" />
                            <span className="text-sm text-white">SMS</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={alertConfig.email} 
                                onChange={(e) => setAlertConfig({...alertConfig, email: e.target.checked})}
                                className="dashboard-checkbox" 
                            />
                            <span className="text-sm text-white">E-mail</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
                            <input type="checkbox" disabled className="dashboard-checkbox" />
                            <span className="text-sm text-white">Push notification</span>
                        </label>
                    </div>
                    <p className="dashboard-subtext mt-3">
                        the <span className="underline cursor-pointer">current on-call person</span>
                    </p>
                </div>

                {/* Team Wait */}
                <div className="pt-6 border-t border-[#26272F]">
                    <label className="dashboard-label">If the on-call person doesn&apos;t acknowledge the incident</label>
                    <div className="relative">
                        <select className="dashboard-input appearance-none cursor-pointer">
                            <option>Do nothing</option>
                            <option>Immediately alert team</option>
                            <option>Wait 5 minutes</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#555B6D] pointer-events-none" />
                    </div>
                </div>

            </div>
        </motion.div>

        {/* SECTION 3: Advanced Settings (Toggle) */}
        <motion.div variants={itemVariants} className="mb-10">
            <button 
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm font-medium text-white pb-2 border-b border-[#26272F] w-full hover:text-[#9CA3AF] transition-colors"
            >
                {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                Advanced settings
            </button>

            {showAdvanced && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-8 flex flex-col xl:flex-row gap-8 xl:gap-14 overflow-hidden"
                >
                    <div className="flex-1 xl:max-w-[300px] mt-2">
                        <h2 className="text-white font-medium text-lg">Advanced settings</h2>
                        <p className="text-[#9CA3AF] text-sm mt-2 leading-relaxed">
                            Configure advanced timeouts, headers, and SSL settings.
                        </p>
                    </div>

                    <div className="flex-2 w-full dashboard-card p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="dashboard-label">Recovery period</label>
                                <select className="dashboard-input">
                                    <option>3 minutes</option>
                                    <option>1 minute</option>
                                </select>
                            </div>
                            <div>
                                <label className="dashboard-label">Check frequency</label>
                                <select className="dashboard-input">
                                    <option>3 minutes</option>
                                    <option>5 minutes</option>
                                </select>
                            </div>
                            <div>
                                <label className="dashboard-label">Request timeout</label>
                                <select className="dashboard-input">
                                    <option>30 seconds</option>
                                    <option>15 seconds</option>
                                </select>
                            </div>
                            <div>
                                <label className="dashboard-label">SSL verification</label>
                                <select className="dashboard-input">
                                    <option>On</option>
                                    <option>Off</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>

        {/* Footer Actions */}
        <motion.div variants={itemVariants} className="flex justify-end pt-6 border-t border-transparent">
            <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary px-8 h-12 text-base w-full sm:w-auto"
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                    </div>
                ) : (
                    "Create monitor"
                )}
            </button>
        </motion.div>

      </form>
    </motion.div>
  );
}