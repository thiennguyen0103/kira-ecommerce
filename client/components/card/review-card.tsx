import { Icons } from "../icons";
import Rating from "../ui/rating";

const ReviewCard = () => {
  return (
    <div className="space-y-3 rounded-xl border bg-background p-6 md:space-y-4 md:px-8 md:py-7">
      <Rating rating={5} variant="yellow" />
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center space-x-2">
          <h4 className="text-5 font-bold">Sarah M.</h4>
          <Icons.verify />
        </div>
        <p className="text-black/60">
          &quot;Tôi thực sự ấn tượng với chất lượng và kiểu dáng của những bộ quần áo
          tôi nhận được từ Shop.co. Từ trang phục thường ngày đến những chiếc
          váy thanh lịch, mọi món đồ tôi mua đều vượt quá mong đợi của tôi.&quot;
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
