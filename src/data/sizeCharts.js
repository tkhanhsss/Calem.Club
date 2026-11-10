export const SIZE_CHARTS = {
  // Áo khoác & Hoodie (Oversize / Boxy)
  hoodie_jacket: {
    title: 'Bảng size Áo Khoác & Hoodie (Unisex)',
    fitNote: 'Form suông rộng thoải mái chuẩn phong cách streetwear. Thích mặc vừa vặn có thể giảm 1 size.',
    headers: ['Size', 'Chiều cao', 'Cân nặng', 'Dài áo', 'Rộng ngực'],
    rows: [
      ['S', '1m55 – 1m65', '45 – 55kg', '68 cm', '116 cm'],
      ['M', '1m65 – 1m72', '55 – 65kg', '71 cm', '122 cm'],
      ['L', '1m70 – 1m78', '65 – 75kg', '74 cm', '128 cm'],
      ['XL', '1m75 – 1m85', '75 – 85kg', '77 cm', '134 cm'],
    ],
  },

  // Áo Polo & Cardigan & Áo thun (Regular / Dệt kim)
  tops_knit: {
    title: 'Bảng size Áo Polo & Cardigan Len (Unisex / Nữ)',
    fitNote: 'Chất len dệt kim và thun cotton có độ co giãn nhẹ, ôm phom vừa vặn, mềm mại.',
    headers: ['Size', 'Chiều cao', 'Cân nặng', 'Dài áo', 'Vòng ngực'],
    rows: [
      ['S', '1m50 – 1m60', '42 – 50kg', '62 cm', '94 cm'],
      ['M', '1m60 – 1m68', '50 – 58kg', '65 cm', '98 cm'],
      ['L', '1m68 – 1m75', '58 – 68kg', '68 cm', '104 cm'],
      ['XL', '1m72 – 1m80', '68 – 78kg', '71 cm', '110 cm'],
    ],
  },

  // Baby Tee & Áo hai dây (Slim fit / Croptop nữ)
  baby_tee: {
    title: 'Bảng size Baby Tee & Áo Hai Dây (Nữ)',
    fitNote: 'Thiết kế dáng ôm nhẹ tôn eo và vòng 1, chất thun co giãn 4 chiều.',
    headers: ['Size', 'Chiều cao', 'Cân nặng', 'Vòng ngực', 'Vòng eo'],
    rows: [
      ['S', '1m48 – 1m58', '40 – 48kg', '76 – 82 cm', '60 – 66 cm'],
      ['M', '1m58 – 1m65', '48 – 54kg', '82 – 88 cm', '66 – 72 cm'],
      ['L', '1m62 – 1m70', '54 – 60kg', '88 – 94 cm', '72 – 78 cm'],
    ],
  },

  // Quần Jeans suông & Short Jeans (Unisex)
  jeans: {
    title: 'Bảng size Quần Jeans & Short Jean (Unisex)',
    fitNote: 'Phom ống suông rộng thời thượng, cạp vừa. Nếu phân vân giữa 2 size, nên chọn size lớn hơn.',
    headers: ['Size', 'Cân nặng', 'Vòng eo', 'Vòng mông', 'Dài quần'],
    rows: [
      ['S (28–29)', '45 – 53kg', '70 – 73 cm', '94 – 97 cm', '100 cm (Short: 52 cm)'],
      ['M (30–31)', '54 – 62kg', '74 – 77 cm', '98 – 101 cm', '102 cm (Short: 54 cm)'],
      ['L (32–33)', '63 – 72kg', '78 – 82 cm', '102 – 106 cm', '104 cm (Short: 56 cm)'],
      ['XL (34–35)', '73 – 83kg', '83 – 87 cm', '107 – 112 cm', '106 cm (Short: 58 cm)'],
    ],
  },

  // Chân váy
  skirts: {
    title: 'Bảng size Chân Váy Xếp Ly & Chấm Bi (Nữ)',
    fitNote: 'Cạp váy ôm vừa vặn vòng eo, bên trong có lớp lót quần bảo hộ an toàn tiện lợi.',
    headers: ['Size', 'Cân nặng', 'Vòng eo', 'Vòng mông', 'Dài váy'],
    rows: [
      ['S', '40 – 48kg', '62 – 66 cm', '86 – 90 cm', '38 cm'],
      ['M', '48 – 54kg', '67 – 71 cm', '91 – 95 cm', '40 cm'],
      ['L', '54 – 60kg', '72 – 76 cm', '96 – 100 cm', '42 cm'],
    ],
  },

  // Phụ kiện freesize
  accessories: {
    title: 'Thông số kích thước Phụ Kiện (Freesize)',
    fitNote: 'Thiết kế thông minh, kích thước chuẩn dễ dùng cho cả nam và nữ.',
    headers: ['Sản phẩm', 'Thông số chi tiết', 'Đặc tính'],
    rows: [
      ['Túi Tote Canvas', '38 × 40 cm, quai đeo 60 cm', 'Vừa laptop 14–15 inch, có ngăn con'],
      ['Mũ Len Ribbed', 'Freesize, chiều sâu 21 cm', 'Len dệt gân co giãn êm ái, giữ nhiệt tốt'],
    ],
  },
};

export function getSizeChartForProduct(product) {
  if (!product) return SIZE_CHARTS.tops_knit;

  if (product.category === 'accessories') return SIZE_CHARTS.accessories;
  if (product.category === 'skirts') return SIZE_CHARTS.skirts;
  if (product.category === 'jeans') return SIZE_CHARTS.jeans;
  if (product.category === 'baby-tees-tops') return SIZE_CHARTS.baby_tee;
  if (product.category === 'sweatshirts' || product.category === 'jackets' || product.slug === 'ao-hoodie-calem') {
    return SIZE_CHARTS.hoodie_jacket;
  }
  return SIZE_CHARTS.tops_knit;
}
