import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import ProductTable from '@/components/products/ProductTable';
import ProductModal from '@/components/products/ProductModal';
import DeleteModal from '@/components/products/DeleteModal';
import { useToast } from '@/hooks/useToast';
import { ProductType, ProductFormValues } from '@/types/product';

export default function ProductPage({ token }: { token: string }) {
  const { logout } = useAuth();
  const { showError } = useToast();
  const { 
    products, 
    isLoading, 
    createProduct,
    updateProduct,
    deleteProduct 
  } = useProducts(token);
  
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (product: ProductType) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  const handleDelete = (code: string) => {
    setProductToDelete(code);
    setShowDeleteModal(true);
  };

  const handleSave = async (productData: ProductFormValues) => {
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.code, productData);
      } else {
        await createProduct(productData);
      }
      setShowModal(false);
    } catch (error) {
      const err = error as Error;
      showError(err.message || 'Failed to save product');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (productToDelete) {
        await deleteProduct(productToDelete);
        setShowDeleteModal(false);
      }
    } catch (error) {
      const err = error as Error;
      showError(err.message || 'Failed to delete product');
    }
  };

  return (
    <PageContainer>
      <Header
        title="Daftar Produk"
        actions={[
          { 
            label: 'Tambah Produk', 
            onClick: handleCreate, 
            variant: 'primary' 
          },
          { 
            label: 'Logout', 
            onClick: logout, 
            variant: 'danger' 
          },
        ]}
      />
      
      <ProductTable
        products={products}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={productToEdit}
        onSave={handleSave}
      />
      
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Produk"
        message={`Apakah Anda yakin ingin menghapus produk ${productToDelete}?`}
      />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
};
