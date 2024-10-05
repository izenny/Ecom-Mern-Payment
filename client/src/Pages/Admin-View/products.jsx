import ProductImageUpload from "@/Components/Admin-view/ProductImageUpload";
import CommonForm from "@/Components/Common/Form";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/Components/ui/sheet";
import { addProductFormElements } from "@/Config";
import React, { Fragment, useState } from "react";
const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalPrice: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const onSubmit = () => {

    
    
  };
  console.log('formdata',formData);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end ">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>Add New Product</SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <CommonForm
              buttonText="Add"
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
