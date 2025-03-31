import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  Icon,
  Flex,
  Button,
} from '@chakra-ui/react';
import { FaTshirt, FaMobile, FaUtensils, FaGem } from 'react-icons/fa';

const TemplateCard = ({ icon, title, description, example, onSelect }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleClick = () => {
    console.log('Template card clicked:', title);
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
        borderColor: 'brand.500',
      }}
      cursor="pointer"
    >
      <VStack align="start" spacing={4}>
        <Flex align="center" gap={2}>
          <Icon as={icon} w={6} h={6} color="brand.500" />
          <Text fontWeight="bold" fontSize="lg">
            {title}
          </Text>
        </Flex>
        
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>

        <Box w="100%" p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="sm" color="gray.700" fontStyle="italic">
            "{example}"
          </Text>
        </Box>

        <Button
          size="sm"
          colorScheme="brand"
          variant="outline"
          onClick={handleClick}
          w="100%"
        >
          Use This Template
        </Button>
      </VStack>
    </Box>
  );
};

const templates = [
  {
    icon: FaTshirt,
    title: "Fashion & Apparel",
    description: "Perfect for clothing, accessories, and fashion items",
    example: "✨ Elevate your style with our premium cotton blend tee. Ultra-soft fabric meets modern design for the perfect everyday essential. Limited stock available! #Fashion #Style #MustHave",
    defaultValues: {
      productName: "Premium Cotton T-Shirt",
      productDetails: "Made from 100% organic cotton, breathable fabric, modern fit, available in multiple colors",
      tone: "Fashionable",
      platform: "Instagram",
      keywords: ["fashion", "style", "cotton", "comfort", "modern"]
    }
  },
  {
    icon: FaMobile,
    title: "Electronics",
    description: "Ideal for gadgets, devices, and tech accessories",
    example: "🚀 Next-gen performance meets sleek design. Experience lightning-fast speeds and crystal-clear displays. Limited time offer - Free shipping! #Tech #Innovation #MustHave",
    defaultValues: {
      productName: "Smart Watch Pro",
      productDetails: "Advanced health tracking, 5-day battery life, water resistant, compatible with iOS and Android",
      tone: "Technical",
      platform: "Amazon",
      keywords: ["tech", "innovation", "smart", "performance", "premium"]
    }
  },
  {
    icon: FaUtensils,
    title: "Food & Beverage",
    description: "Great for restaurants, food products, and beverages",
    example: "🍽️ Indulge in our chef's signature pasta dish. Fresh ingredients, authentic Italian recipe, perfect for date night. Book your table now! #Foodie #Italian #FineDining",
    defaultValues: {
      productName: "Signature Pasta",
      productDetails: "Handmade pasta, fresh ingredients, authentic Italian recipe, perfect for sharing",
      tone: "Appetizing",
      platform: "Instagram",
      keywords: ["food", "italian", "fresh", "authentic", "delicious"]
    }
  },
  {
    icon: FaGem,
    title: "Luxury & Jewelry",
    description: "Perfect for high-end products and luxury items",
    example: "💎 Timeless elegance meets modern luxury. Each piece tells a unique story of craftsmanship and sophistication. Limited edition collection. #Luxury #Elegance #Exclusive",
    defaultValues: {
      productName: "Diamond Pendant",
      productDetails: "0.5 carat diamond, 18k gold setting, certified quality, comes with presentation box",
      tone: "Luxurious",
      platform: "Shopify",
      keywords: ["luxury", "elegance", "diamond", "exclusive", "premium"]
    }
  }
];

export default function Templates({ onSelectTemplate }) {
  const handleTemplateSelect = (templateData) => {
    console.log('Template selected in Templates component:', templateData);
    if (onSelectTemplate) {
      onSelectTemplate(templateData);
    }
  };

  return (
    <Box py={8}>
      <VStack spacing={6} align="start">
        <Text fontSize="lg" fontWeight="medium" color="gray.700">
          Quick Start Templates
        </Text>
        <Text fontSize="sm" color="gray.500">
          Choose a template to get started quickly, or customize it to match your needs
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              {...template}
              onSelect={() => handleTemplateSelect(template.defaultValues)}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
} 