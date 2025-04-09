import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <motion.h1
        className="text-3xl font-bold underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Hello world with Framer Motion!
      </motion.h1>

      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </motion.button>
    </>
  );
}

export default App;
