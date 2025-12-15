'use client'
import { Truck, ShieldCheck, Headset, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹999" },
    { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transaction" },
    { icon: Headset, title: "24/7 Support", desc: "Dedicated support team" },
    { icon: CreditCard, title: "Easy Returns", desc: "7-day money back guarantee" },
];

const Features = () => {
    return (
        <div className="w-full py-16 border-y border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            key={index}
                            className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-default"
                        >
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features