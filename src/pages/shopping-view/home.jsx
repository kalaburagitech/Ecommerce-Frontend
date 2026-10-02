import { Button } from "@/components/ui/button";
import {
  Apple,
  MilkOff as Milk, // closest match for dairy
  Coffee,
  Cookie,
  Home,
  ShoppingCart,
  IceCream2 as IceCream, // closest match for Amul
  Sandwich,
  Pizza as Chips,
  CupSoda,
  Leaf,
  Coffee as MugHot,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Truck,
  ShieldCheck,
  Clock,
  BadgePercent,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "fruits", label: "Fruits & Vegetables", icon: Apple, color: "bg-emerald-50 text-emerald-600" },
  { id: "dairy", label: "Dairy & Bakery", icon: Milk, color: "bg-amber-50 text-amber-600" },
  { id: "beverages", label: "Beverages", icon: Coffee, color: "bg-orange-50 text-orange-600" },
  { id: "snacks", label: "Snacks & Branded Foods", icon: Cookie, color: "bg-rose-50 text-rose-600" },
  { id: "household", label: "Household Essentials", icon: Home, color: "bg-sky-50 text-sky-600" },
];

const brandsWithIcon = [
  { id: "amul", label: "Amul", icon: IceCream },
  { id: "britannia", label: "Britannia", icon: Sandwich },
  { id: "lays", label: "Lays", icon: Chips },
  { id: "nescafe", label: "Nescafe", icon: MugHot },
  { id: "tata", label: "Tata", icon: Leaf },
  { id: "pepsico", label: "PepsiCo", icon: CupSoda },
];

const trustBadges = [
  { icon: Truck, title: "Free Delivery", subtitle: "On orders above ₹499" },
  { icon: Clock, title: "30-Min Delivery", subtitle: "Fresh to your doorstep" },
  { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% protected checkout" },
  { icon: BadgePercent, title: "Best Prices", subtitle: "Daily deals & offers" },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!isAuthenticated) {
      toast({ title: "Please login to add items to cart" });
      navigate("/auth/login");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Item added to your basket",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (featureImageList.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <div className="relative w-full h-[420px] md:h-[560px] overflow-hidden rounded-b-[2.5rem] shadow-xl">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                alt={`Slide ${index + 1}`}
              />
            ))
          : null}

        {/* gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        {/* hero copy */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs md:text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
                🌿 100% Fresh · Delivered in 30 minutes
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Groceries delivered,
                <br />
                the fresh way.
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/85 max-w-md">
                Farm-fresh fruits, vegetables, and everyday essentials — handpicked
                and delivered straight to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/shop/listing")}
                  className="bg-white text-black hover:bg-white/90 font-semibold px-6"
                >
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/shop/listing")}
                  className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white font-semibold px-6"
                >
                  Explore Categories
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* slide controls */}
        {featureImageList && featureImageList.length > 1 ? (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + featureImageList.length) % featureImageList.length
                )
              }
              className="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 bg-white/15 backdrop-blur-sm border-white/30 text-white hover:bg-white/25 hover:text-white"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
              }
              className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 bg-white/15 backdrop-blur-sm border-white/30 text-white hover:bg-white/25 hover:text-white"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {featureImageList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Trust badges */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{badge.title}</p>
                  <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Shop by Category
              </h2>
              <p className="text-muted-foreground mt-1">
                Everything you need, organized for you
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${categoryItem.color}`}
                  >
                    <categoryItem.icon className="w-8 h-8" />
                  </div>
                  <span className="font-semibold text-sm">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-10">
            Popular Brands
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() =>
                  handleNavigateToListingPage(brandItem, "brand")
                }
                className="cursor-pointer border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl bg-white"
              >
                <CardContent className="flex flex-col items-center justify-center p-5 text-center">
                  <brandItem.icon className="w-8 h-8 mb-3 text-gray-700" />
                  <span className="font-medium text-xs">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Fresh Picks for You
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked favourites, just for today
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/shop/listing")}
              className="hidden md:inline-flex font-semibold"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
