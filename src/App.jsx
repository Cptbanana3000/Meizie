import { useState } from 'react'
import { ChakraProvider, Flex, Box, Container, Divider, Text, extendTheme } from '@chakra-ui/react'
import Hero from './components/Hero'
import CaptionForm from './components/Form'
import CaptionList from './components/CaptionList'
import Paywall from './components/Paywall'
import PricingPlans from './components/PricingPlans'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import { generateCaptions } from './utils/ai'
import { useUsageTracker } from './hooks/useAnalytics'

// Custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#eaeaff',
      100: '#c2c3f8',
      300: '#7A70FF',
      500: '#4F46E5', // Primary color
      600: '#3c34d1',
      700: '#2a23be',
    },
    accent: {
      300: '#4AE3B5',
      500: '#10B981', // Secondary color
      600: '#0B9A69',
    }
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        scrollBehavior: 'smooth',
      },
    },
  },
});

function App() {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const { showPaywall, trackUsage, dismissPaywall, remainingUses, isFreeTier } = useUsageTracker();
  
  const handleFormSubmit = async (data) => {
    // Check if user can generate captions
    const canGenerate = trackUsage(); 
    if (!canGenerate) {
      return; // Don't proceed if usage limit reached
    }
    
    setLoading(true);
    setFormData(data);
    
    try {
      const generatedCaptions = await generateCaptions(data);
      setCaptions(generatedCaptions);
    } catch (error) {
      console.error('Error generating captions:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegenerate = async () => {
    if (!formData) return;
    
    // Check if user can generate captions
    const canGenerate = trackUsage();
    if (!canGenerate) {
      return; // Don't proceed if usage limit reached
    }
    
    setLoading(true);
    try {
      const generatedCaptions = await generateCaptions(formData);
      setCaptions(generatedCaptions);
    } catch (error) {
      console.error('Error regenerating captions:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh" bg="gray.50">
        <Hero />
        
        <Container maxW="container.xl" py={10} px={{ base: 4, md: 8 }} flex="1">
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 8, lg: 12 }}
            mb={8}
          >
            <Box 
              flex={1}
              borderRadius="lg" 
              overflow="hidden" 
              bg="white"
              boxShadow="sm"
              p={{ base: 4, md: 6 }}
              position="relative"
            >
              {isFreeTier && (
                <Text 
                  position="absolute" 
                  top={2} 
                  right={4} 
                  fontSize="sm" 
                  color="gray.500"
                  fontWeight="medium"
                >
                  {remainingUses} free {remainingUses === 1 ? 'use' : 'uses'} remaining
                </Text>
              )}
              <CaptionForm onSubmit={handleFormSubmit} />
            </Box>
            
            <Box flex={1}>
              <CaptionList 
                captions={captions} 
                loading={loading} 
                onRegenerate={handleRegenerate} 
              />
              
              <Paywall show={showPaywall} onClose={dismissPaywall} />
            </Box>
          </Flex>
          
          <Divider my={10} />
          
          {/* Testimonials Section */}
          <Testimonials />
          
          <Divider my={10} />
          
          {/* Features Section */}
          <Features />
          
          <Divider my={10} />
          
          {/* Pricing Plans Section */}
          <Box id="pricing-section">
            <PricingPlans />
          </Box>
        </Container>
        
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default App
