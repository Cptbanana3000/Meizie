import { useState } from 'react';
import { 
  VStack, Input, Textarea, Select, Tag, TagLabel,
  HStack, Button, Box, IconButton, Flex, Heading,
  FormControl, FormLabel, InputGroup, InputLeftAddon,
  useColorModeValue, Badge
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function CaptionForm({ onSubmit, initialData }) {
  const [productName, setProductName] = useState(initialData?.productName || '');
  const [productDetails, setProductDetails] = useState(initialData?.productDetails || '');
  const [tone, setTone] = useState(initialData?.tone || 'Professional');
  const [platform, setPlatform] = useState(initialData?.platform || 'Instagram');
  const [keywords, setKeywords] = useState(initialData?.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');

  const formBackground = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      productName,
      productDetails,
      tone,
      platform,
      keywords
    });
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  return (
    <Box as="form" onSubmit={handleSubmit} id="caption-form">
      <VStack spacing={6} w="100%" mx="auto">
        <Heading size="md" alignSelf="flex-start" color="brand.500">
          Generate Your Captions
        </Heading>
        
        <FormControl isRequired>
          <FormLabel fontWeight="medium">Product Name</FormLabel>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., 'Organic Cotton T-Shirt'"
            size="md"
          />
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel fontWeight="medium">Product Details</FormLabel>
          <Textarea
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            placeholder="Describe your product features, benefits, and target audience..."
            minH="100px"
          />
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel fontWeight="medium">Tone</FormLabel>
          <Select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Fashionable">Fashionable</option>
            <option value="Technical">Technical</option>
            <option value="Appetizing">Appetizing</option>
            <option value="Luxurious">Luxurious</option>
          </Select>
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel fontWeight="medium">Platform</FormLabel>
          <Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Amazon">Amazon</option>
            <option value="Shopify">Shopify</option>
            <option value="Etsy">Etsy</option>
          </Select>
        </FormControl>
        
        <FormControl>
          <FormLabel fontWeight="medium">Keywords (Optional)</FormLabel>
          <InputGroup>
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Add keywords to include in captions"
              onKeyPress={(e) => e.key === 'Enter' && addKeyword(e)}
            />
            <InputLeftAddon
              as="button"
              type="button"
              onClick={addKeyword}
              cursor="pointer"
              bg="brand.500"
              color="white"
              _hover={{ bg: 'brand.600' }}
            >
              Add
            </InputLeftAddon>
          </InputGroup>
          
          {keywords.length > 0 && (
            <Box mt={2}>
              {keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  m={1}
                  p={2}
                  borderRadius="md"
                  colorScheme="brand"
                  cursor="pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </Badge>
              ))}
            </Box>
          )}
        </FormControl>
        
        <Button
          type="submit"
          colorScheme="brand"
          size="lg"
          w="100%"
          py={6}
          boxShadow="md"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          Generate My Captions
        </Button>
      </VStack>
    </Box>
  );
} 