import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaHistory, 
  FaMagic, 
  FaImages, 
  FaCogs, 
  FaBrain, 
  FaGlobe, 
  FaCode, 
  FaChartLine, 
  FaUsers
} from 'react-icons/fa';

const Feature = ({ title, text, icon, isNew }) => {
  return (
    <Stack
      p={5}
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.3s"
      position="relative"
    >
      {isNew && (
        <Badge
          position="absolute"
          top="-10px"
          right="-10px"
          colorScheme="green"
          fontSize="xs"
          py={1}
          px={2}
          borderRadius="full"
        >
          NEW
        </Badge>
      )}
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        rounded="full"
        bg={useColorModeValue('brand.500', 'brand.300')}
        color="white"
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600} fontSize="lg">
        {title}
      </Text>
      <Text color="gray.600" fontSize="sm">
        {text}
      </Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Box py={12}>
      <VStack spacing={4} textAlign="center" mb={12}>
        <Heading as="h2" fontSize="3xl" color="brand.600">
          Advanced AI Features
        </Heading>
        <Text fontSize="lg" color="gray.500">
          Streamline your e-commerce marketing with our powerful AI tools
        </Text>
      </VStack>
      
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Feature
            icon={FaMagic}
            title="Smart Caption Templates"
            text="Pre-designed templates optimized for different e-commerce platforms and product categories."
            isNew={true}
          />
          
          <Feature
            icon={FaHistory}
            title="Caption History"
            text="Save and organize your generated captions with searchable history and folders."
          />
          
          <Feature
            icon={FaImages}
            title="Image Analysis"
            text="Upload product photos to get captions that highlight visible features (Coming soon)."
            isNew={true}
          />
          
          <Feature
            icon={FaCogs}
            title="Advanced Customization"
            text="Fine-tune tone, length, keywords, and style for perfect caption alignment with your brand."
          />
          
          <Feature
            icon={FaBrain}
            title="Multilingual Support"
            text="Generate captions in multiple languages for global marketplaces (Coming soon)."
          />
          
          <Feature
            icon={FaGlobe}
            title="SEO Optimization"
            text="Keyword suggestions and optimizations to improve your product visibility in search."
          />
          
          <Feature
            icon={FaCode}
            title="API Integration"
            text="Connect directly to your store with our API for automated caption generation."
          />
          
          <Feature
            icon={FaChartLine}
            title="Performance Analytics"
            text="Track which captions perform best with A/B testing and engagement metrics."
            isNew={true}
          />
          
          <Feature
            icon={FaUsers}
            title="Team Collaboration"
            text="Share caption workspaces with team members for seamless collaboration."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
} 