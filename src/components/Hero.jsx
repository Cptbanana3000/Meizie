import { Box, Heading, Text, Image, VStack, Container, Flex, Badge, Button, Icon } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

export default function Hero({ onTryNow }) {
  return (
    <Box 
      py={16} 
      px={4} 
      bg="brand.500" 
      color="white"
      position="relative"
      overflow="hidden"
    >
      {/* Background gradient effect */}
      <Box 
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-r, brand.600, brand.500)"
        opacity="0.9"
        zIndex="0"
      />
      
      {/* Background pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`}
        backgroundSize="24px 24px"
        zIndex="0"
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <Flex 
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 10, md: 4 }}
        >
          <VStack align={{ base: "center", md: "flex-start" }} spacing={6} maxW={{ base: "100%", md: "60%" }}>
            <Flex align="center" mb={2} position="relative">
              <Heading 
                as="h1" 
                size="2xl" 
                lineHeight="1.2"
                fontWeight="extrabold"
              >
                Meizie
              </Heading>
              <Badge ml={3} colorScheme="accent" fontSize="md" px={2} py={1}>AI-Powered</Badge>
            </Flex>
            
            <Heading 
              as="h2" 
              size="xl" 
              lineHeight="1.2"
              fontWeight="bold"
              opacity="0.95"
            >
              Generate High-Converting Product Captions in Seconds
            </Heading>
            
            <Text fontSize="xl" opacity="0.9">
              Perfect for Shopify, Amazon, and Instagram stores. Turn product details into engaging captions that sell.
            </Text>

            <Flex gap={4} direction={{ base: "column", sm: "row" }} w={{ base: "100%", sm: "auto" }}>
              <Button
                size="lg"
                colorScheme="accent"
                onClick={onTryNow}
                rightIcon={<Icon as={FaArrowRight} />}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                transition="all 0.2s"
              >
                Try For Free
              </Button>
              <Box position="relative" alignSelf="center">
                <Badge
                  colorScheme="green"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                  textTransform="none"
                  fontWeight="medium"
                  bg="green.400"
                  color="white"
                >
                  3 Free Generations
                </Badge>
                <Box
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  bg="yellow.400"
                  color="gray.800"
                  borderRadius="full"
                  fontSize="xs"
                  px={2}
                  py={0.5}
                  fontWeight="bold"
                >
                  NEW
                </Box>
              </Box>
            </Flex>
          </VStack>
          
          <Box 
            width={{ base: "100%", md: "40%" }} 
            maxW="400px"
            borderRadius="2xl" 
            overflow="hidden"
            boxShadow="2xl"
            bg="white"
            p={1}
          >
            <Image 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800"
              alt="AI-generated e-commerce captions"
              width="100%"
              height="auto"
              objectFit="cover"
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.02)" }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
} 