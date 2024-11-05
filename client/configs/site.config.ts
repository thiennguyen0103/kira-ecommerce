import { SettingsIcon, UserIcon } from "lucide-react";

export const siteConfig = {
  header: {
    account: [
      {
        id: "profile",
        path: "/account/me",
        title: "Tài khoản của tôi",
        icon: UserIcon,
      },
      {
        id: "settings",
        path: "/account/settings",
        title: "Cài đặt",
        icon: SettingsIcon,
      },
    ],
  },
  footer: [
    {
      id: "company",
      name: "Công ty",
      children: [
        {
          id: "about",
          name: "Về chúng tôi",
          path: "/ve-chung-toi",
        },
        {
          id: "features",
          name: "Chức năng",
          path: "/chuc-nang",
        },
        {
          id: "works",
          name: "Công việc",
          path: "/cong-viec",
        },
        {
          id: "career",
          name: "Sự nghiệp",
          path: "/su-nghiep",
        },
      ],
    },
    {
      id: "help",
      name: "Hỗ trợ",
      children: [
        {
          id: "customerSupport",
          name: "Hỗ trợ khách hàng",
          path: "/ho-tro-khach-hang",
        },
        {
          id: "deliveryDetails",
          name: "Chi tiết vận chuyển",
          path: "/van-chuyen",
        },
        {
          id: "termAndConditions",
          name: "Điều khoản",
          path: "/dieu-khoan",
        },
        {
          id: "privacyPolicy",
          name: "Chính sách riêng tư",
          path: "/chinh-sach",
        },
      ],
    },
    {
      id: "faq",
      name: "Faq",
      children: [
        {
          id: "account",
          name: "Tài khoản",
          path: "/tai-khoan",
        },
        {
          id: "manageDeliveries",
          name: "Quản lý vận chuyển",
          path: "/quan-ly-van-chuyen",
        },
        {
          id: "orders",
          name: "Đơn hàng",
          path: "/don-hang",
        },
        {
          id: "payments",
          name: "Thanh toán",
          path: "/thanh-toan",
        },
      ],
    },
    {
      id: "resources",
      name: "Nguồn lực",
      children: [
        {
          id: "freeEbooks",
          name: "eBooks miễn phí",
          path: "/free-ebook",
        },
        {
          id: "developmentTutorial",
          name: "Hướng dẫn phát triển",
          path: "/huong-dan-phat-trien",
        },
        {
          id: "howToBlog",
          name: "Cách làm blog",
          path: "/blog",
        },
        {
          id: "youtubeList",
          name: "Danh sách youtube",
          path: "/youtube",
        },
      ],
    },
  ],
};
