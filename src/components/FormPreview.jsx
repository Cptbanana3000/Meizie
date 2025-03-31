import { 
  VStack, Input, Textarea, Select, Box, Heading,
  FormControl, FormLabel, InputGroup, InputLeftAddon,
  useColorModeValue, Button, Text, Badge, Tabs,
  TabList, TabPanels, Tab, TabPanel, Divider
} from '@chakra-ui/react';
import Templates from './Templates';

export default function FormPreview({ onTryNow, onSelectTemplate }) {
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleTryNowClick = () => {
    console.log('Try Now clicked');
    if (onTryNow) {
      onTryNow();
    }
  };

  const handleTemplateSelect = (templateData) => {
    console.log('Template selected:', templateData);
    if (onSelectTemplate) {
      onSelectTemplate(templateData);
    }
  };

  return (
    <Box 
      p={6} 
      bg="white" 
      borderRadius="lg" 
      boxShadow="lg"
      position="relative"
      overflow="hidden"
    >
      {/* Overlay gradient */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-b, transparent 60%, white 100%)"
        zIndex="1"
        pointerEvents="none"
      />
      
      <VStack spacing={6} w="100%" mx="auto" position="relative" zIndex="2">
        <Heading size="md" alignSelf="flex-start" color="brand.500">
          Generate Your Captions
        </Heading>

        <Tabs w="100%" variant="enclosed">
          <TabList>
            <Tab>Quick Start</Tab>
            <Tab>Examples</Tab>
            <Tab>How It Works</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel px={0}>
              <Templates onSelectTemplate={handleTemplateSelect} />
            </TabPanel>
            
            <TabPanel px={0}>
              <VStack spacing={6} align="start">
                <Text fontSize="lg" fontWeight="medium" color="gray.700">
                  Before & After Examples
                </Text>
                
                <Box w="100%" p={4} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Before:
                  </Text>
                  <Text fontSize="sm" color="gray.700" fontStyle="italic">
                    "Premium cotton t-shirt, comfortable fit, available in black and white"
                  </Text>
                </Box>
                
                <Box w="100%" p={4} bg="green.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    After:
                  </Text>
                  <Text fontSize="sm" color="gray.700" fontStyle="italic">
                    "✨ Elevate your style with our premium cotton blend tee. Ultra-soft fabric meets modern design for the perfect everyday essential. Limited stock available! #Fashion #Style #MustHave"
                  </Text>
                </Box>

                <Box w="100%" p={4} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Before:
                  </Text>
                  <Text fontSize="sm" color="gray.700" fontStyle="italic">
                    "Smart watch with health tracking and notifications"
                  </Text>
                </Box>
                
                <Box w="100%" p={4} bg="green.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    After:
                  </Text>
                  <Text fontSize="sm" color="gray.700" fontStyle="italic">
                    "🚀 Next-gen performance meets sleek design. Experience lightning-fast speeds and crystal-clear displays. Limited time offer - Free shipping! #Tech #Innovation #MustHave"
                  </Text>
                </Box>
              </VStack>
            </TabPanel>
            
            <TabPanel px={0}>
              <VStack spacing={6} align="start">
                <Text fontSize="lg" fontWeight="medium" color="gray.700">
                  How Meizie Works
                </Text>
                
                <VStack spacing={4} align="start" w="100%">
                  <Box>
                    <Text fontWeight="medium" color="brand.500">1. Choose a Template</Text>
                    <Text fontSize="sm" color="gray.600">Select from our pre-made templates or start from scratch</Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="medium" color="brand.500">2. Fill in Details</Text>
                    <Text fontSize="sm" color="gray.600">Add your product information, tone, and target platform</Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="medium" color="brand.500">3. Generate Captions</Text>
                    <Text fontSize="sm" color="gray.600">Get multiple AI-generated captions optimized for your needs</Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="medium" color="brand.500">4. Customize & Use</Text>
                    <Text fontSize="sm" color="gray.600">Edit, regenerate, or use the captions as is</Text>
                  </Box>
                </VStack>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Divider my={4} />
        
        <Box w="100%" textAlign="center" mt={4}>
          <Button
            colorScheme="accent"
            size="lg"
            onClick={handleTryNowClick}
            w="100%"
            py={6}
            boxShadow="md"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            Try Now - 3 Free Generations
          </Button>
          <Text fontSize="sm" color="gray.500" mt={2}>
            No credit card required
          </Text>
        </Box>
      </VStack>
    </Box>
  );
} 