import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <motion.div 
          className="text-center max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-8xl font-bold mb-4 nineties-text-shadow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.div>
          
          <motion.h1 
            className="text-2xl font-bold text-verified-light/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Page Not Found
          </motion.h1>
          
          <motion.p 
            className="text-verified-light/60 mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              onClick={() => navigate("/")}
              className="gradient-purple text-verified-light px-6 py-6 rounded-full"
            >
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;