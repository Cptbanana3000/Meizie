import { useState, useEffect } from 'react'
import { ChakraProvider, Flex, Box, Container, Divider, Text, extendTheme, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, VStack, Button } from '@chakra-ui/react'
import Hero from './components/Hero'
import CaptionForm from './components/Form'
import CaptionList from './components/CaptionList'
import PricingPlans from './components/PricingPlans'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import FormPreview from './components/FormPreview'
import { generateCaptions } from './utils/ai'

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

export default function App() {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [remainingUses, setRemainingUses] = useState(3);
  const [isFreeTier, setIsFreeTier] = useState(true);
  const [formData, setFormData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Load remaining uses from localStorage on mount
  useEffect(() => {
    const savedUses = localStorage.getItem('remainingUses');
    if (savedUses) {
      setRemainingUses(parseInt(savedUses));
    }
  }, []);

  const handleFormSubmit = async (formData) => {
    if (remainingUses <= 0) {
      onOpen();
      return;
    }

    setLoading(true);
    try {
      const generatedCaptions = await generateCaptions(formData);
      setCaptions(generatedCaptions);
      
      // Update remaining uses
      const newRemainingUses = remainingUses - 1;
      setRemainingUses(newRemainingUses);
      localStorage.setItem('remainingUses', newRemainingUses.toString());
      
      if (newRemainingUses === 0) {
        onOpen();
      }
    } catch (error) {
      console.error('Error generating captions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (formData) => {
    if (remainingUses <= 0) {
      onOpen();
      return;
    }

    setLoading(true);
    try {
      const generatedCaptions = await generateCaptions(formData);
      setCaptions(generatedCaptions);
      
      // Update remaining uses
      const newRemainingUses = remainingUses - 1;
      setRemainingUses(newRemainingUses);
      localStorage.setItem('remainingUses', newRemainingUses.toString());
      
      if (newRemainingUses === 0) {
        onOpen();
      }
    } catch (error) {
      console.error('Error regenerating captions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTryNow = () => {
    setShowForm(true);
    // Use setTimeout to ensure the form is rendered before scrolling
    setTimeout(() => {
      const formElement = document.querySelector('#caption-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectTemplate = (templateData) => {
    setFormData(templateData);
    handleTryNow();
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh" bg="gray.50">
        <Hero onTryNow={handleTryNow} />
        
        <Container maxW="container.xl" py={10} px={{ base: 4, md: 8 }} flex="1">
          {showForm ? (
            <VStack spacing={8} align="stretch">
              <Box 
                w="100%"
                maxW="800px"
                mx="auto"
                bg="white"
                borderRadius="xl"
                boxShadow="xl"
                p={{ base: 6, md: 8 }}
                position="relative"
              >
                {isFreeTier && (
                  <Text 
                    position="absolute" 
                    top={4} 
                    right={4} 
                    fontSize="sm" 
                    color="gray.500"
                    fontWeight="medium"
                    bg="gray.50"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {remainingUses} free {remainingUses === 1 ? 'use' : 'uses'} remaining
                  </Text>
                )}
                <CaptionForm onSubmit={handleFormSubmit} initialData={formData} />
              </Box>

              {captions.length > 0 && (
                <Box 
                  w="100%"
                  maxW="800px"
                  mx="auto"
                  bg="white"
                  borderRadius="xl"
                  boxShadow="xl"
                  p={{ base: 6, md: 8 }}
                >
                  <CaptionList 
                    captions={captions} 
                    loading={loading} 
                    onRegenerate={handleRegenerate} 
                  />
                </Box>
              )}
            </VStack>
          ) : (
            <FormPreview onTryNow={handleTryNow} onSelectTemplate={handleSelectTemplate} />
          )}
          
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

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="2xl" textAlign="center">Upgrade to Premium</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={8}>
              <VStack spacing={6} align="stretch">
                <Text fontSize="lg" textAlign="center">
                  You've used all your free generations. Upgrade to continue creating amazing captions!
                </Text>
                <Box 
                  bg="brand.50" 
                  p={6} 
                  borderRadius="lg"
                  textAlign="center"
                >
                  <Text fontSize="xl" fontWeight="bold" color="brand.500">
                    Get Unlimited Generations
                  </Text>
                  <Text mt={2} color="gray.600">
                    Plus access to premium features and priority support
                  </Text>
                </Box>
                <Button 
                  colorScheme="brand" 
                  size="lg" 
                  onClick={() => {
                    onClose();
                    document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' });
                  }}
                  py={6}
                  fontSize="lg"
                >
                  View Premium Plans
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
}
