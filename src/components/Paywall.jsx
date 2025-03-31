import { Box, Text, Button, VStack, Heading, Badge, Flex, Icon, HStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export default function Paywall({ show, onClose }) {
  if (!show) return null;
  
  const features = [
    "Generate 50 captions instantly",
    "Priority support via email",
    "Save and organize your captions",
    "Access to premium templates"
  ];
  
  return (
    <Box 
      p={8} 
      bg="white" 
      borderRadius="xl" 
      textAlign="center"
      boxShadow="xl"
      border="1px solid"
      borderColor="gray.200"
      position="relative"
      mt={8}
      overflow="hidden"
    >
      {/* Background accent */}
      <Box 
        position="absolute" 
        top="0" 
        right="0" 
        left="0" 
        height="8px" 
        bgGradient="linear(to-r, brand.500, accent.500)" 
      />
      
      <Badge 
        colorScheme="accent" 
        position="absolute" 
        top="12px" 
        right="12px" 
        fontSize="sm" 
        py={1}
        px={3}
        borderRadius="full"
        textTransform="none"
        fontWeight="medium"
      >
        Limited Time Offer
      </Badge>
      
      <VStack spacing={6} pt={4}>
        <Flex align="center">
          <Heading size="lg" color="gray.800">
            Unlock Meizie
          </Heading>
          <Text color="accent.500" fontSize="lg" fontWeight="bold" ml={2}>
            AI
          </Text>
        </Flex>
        
        <Text fontSize="md" color="gray.600" maxW="400px" mx="auto">
          You've used all your free captions! Choose a plan to continue generating high-converting content.
        </Text>
        
        <HStack spacing={4} w="100%" justify="center" mt={2}>
          <Button 
            as="a"
            href="#monthly-plan"
            colorScheme="brand"
            size="md"
            onClick={() => {
              onClose();
              document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See Monthly Plans
          </Button>
          
          <Button 
            as="a"
            href="#lifetime-plan"
            colorScheme="accent"
            size="md"
            variant="outline"
            onClick={() => {
              onClose();
              document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Lifetime Access
          </Button>
        </HStack>
        
        <Box 
          p={6} 
          bg="gray.50" 
          borderRadius="lg" 
          w="100%"
          borderWidth="1px"
          borderColor="gray.200"
          mt={2}
        >
          <Heading size="md" color="gray.700" mb={4}>Quick Starter Plan</Heading>
          
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            $5 <Text as="span" fontSize="sm" fontWeight="normal" color="gray.500">one-time fee</Text>
          </Text>
          
          <VStack spacing={3} mt={6} align="start">
            {features.map((feature, index) => (
              <Flex key={index} align="center">
                <Icon as={CheckIcon} color="green.500" mr={2} />
                <Text fontSize="sm" color="gray.700">{feature}</Text>
              </Flex>
            ))}
          </VStack>
          
          <Button 
            as="a"
            href="https://gumroad.com/l/meizie-ai-captions"
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="brand"
            size="lg"
            w="100%"
            mt={6}
            fontSize="md"
          >
            Get 50 Captions for $5
          </Button>
        </Box>
        
        <Button 
          variant="link" 
          size="sm" 
          onClick={onClose}
          color="gray.500"
        >
          Continue with limited access
        </Button>
      </VStack>
    </Box>
  );
} 