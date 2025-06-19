export default function handler(req, res) {
  const { slug } = req.query;
  
  // Mock guide data instead of importing from a file
  const mockGuide = {
    title: "Bitcoin Beginner's Guide",
    slug: "bitcoin-beginners-guide",
    description: "Learn everything you need to know about Bitcoin as a beginner",
    content: "This is a placeholder for guide content.",
    sections: [
      {
        title: "Introduction to Bitcoin",
        content: "Bitcoin is a decentralized digital currency."
      },
      {
        title: "How to Buy Bitcoin",
        content: "There are many exchanges where you can purchase Bitcoin."
      }
    ]
  };
  
  // Check if the requested slug matches our mock guide
  if (slug === mockGuide.slug || slug === 'bitcoin-beginners-guide') {
    res.status(200).json({ guide: mockGuide });
  } else {
    res.status(404).json({ message: 'Guide not found' });
  }
}
