import { useState } from 'react';
import { 
  VStack, Input, Textarea, Select, Tag, TagLabel,
  HStack, Button, Box, IconButton, Flex, Heading,
  FormControl, FormLabel, InputGroup, InputLeftAddon,
  useColorModeValue
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function CaptionForm({ onSubmit }) {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [tone, setTone] = useState('');
  const [platform, setPlatform] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [inputKeyword, setInputKeyword] = useState('');

  const formBackground = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleAddKeyword = () => {
    if (inputKeyword.trim() && !keywords.includes(inputKeyword.trim())) {
      setKeywords([...keywords, inputKeyword.trim()]);
      setInputKeyword('');
    }
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  const handleSubmit = () => {
    onSubmit({
      productName,
      details: productDetails,
      tone,
      platform,
      keywords
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <VStack spacing={6} w="100%" mx="auto">
      <Heading size="md" alignSelf="flex-start" color="brand.500">
        Generate Your Captions
      </Heading>
      
      <FormControl>
        <FormLabel fontWeight="medium">Product Name</FormLabel>
        <Input
          placeholder="e.g., 'Organic Cotton T-Shirt'"
          size="md"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          borderColor={borderColor}
          focusBorderColor="brand.400"
        />
      </FormControl>
      
      <FormControl>
        <FormLabel fontWeight="medium">Product Details</FormLabel>
        <Textarea
          placeholder="Describe your product features, benefits, and target audience. The more details, the better the captions."
          minH="150px"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          borderColor={borderColor}
          focusBorderColor="brand.400"
        />
      </FormControl>
      
      <HStack w="100%" spacing={4}>
        <FormControl flex="1">
          <FormLabel fontWeight="medium">Tone</FormLabel>
          <Select 
            placeholder="Select Tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            borderColor={borderColor}
            focusBorderColor="brand.400"
          >
            <option value="friendly">😊 Friendly</option>
            <option value="urgent">⏳ Urgent</option>
            <option value="luxury">💎 Luxury</option>
            <option value="casual">👌 Casual</option>
          </Select>
        </FormControl>
        
        <FormControl flex="1">
          <FormLabel fontWeight="medium">Platform</FormLabel>
          <Select 
            placeholder="Select Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            borderColor={borderColor}
            focusBorderColor="brand.400"
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
            <option value="amazon">Amazon</option>
          </Select>
        </FormControl>
      </HStack>
      
      <FormControl>
        <FormLabel fontWeight="medium">Keywords</FormLabel>
        <InputGroup mb={2}>
          <InputLeftAddon children="#" backgroundColor="gray.100" />
          <Input
            placeholder="Add keyword (e.g., 'sustainable')"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            borderColor={borderColor}
            focusBorderColor="brand.400"
          />
          <Button 
            colorScheme="accent" 
            onClick={handleAddKeyword}
            ml={2}
          >
            Add
          </Button>
        </InputGroup>
        
        <Box w="100%" minH="50px">
          <Flex wrap="wrap" gap={2}>
            {keywords.map((kw, i) => (
              <Tag key={i} colorScheme="brand" size="md" borderRadius="full">
                <TagLabel>#{kw}</TagLabel>
                <IconButton
                  aria-label={`Remove ${kw}`}
                  icon={<CloseIcon />}
                  size="xs"
                  ml={1}
                  onClick={() => handleRemoveKeyword(i)}
                  variant="unstyled"
                  h="auto"
                  minW="auto"
                  p={0}
                />
              </Tag>
            ))}
          </Flex>
        </Box>
      </FormControl>
      
      <Button 
        colorScheme="brand" 
        size="lg" 
        onClick={handleSubmit}
        isDisabled={!productName || !productDetails || !tone || !platform}
        w="100%"
        mt={4}
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
  );
} 