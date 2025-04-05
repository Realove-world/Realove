// components/ProfileCard.tsx

interface ProfileCardProps {
    imageUrl: string;
  }
  
  export default function ProfileCard({ imageUrl }: ProfileCardProps) {
    return (
      <div className="w-[350px] md:w-[400px] border-2 border-black bg-[#fef6f6] mx-auto mt-10 font-mono">
        {/* Top bar */}
        <div className="flex items-center justify-start p-2 border-b-2 border-black">
          <div className="w-4 h-4 border-2 border-black bg-pink-300" />
        </div>
  
        {/* Image Section */}
        <div className="border-2 border-black m-4">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-auto object-cover"
          />
        </div>
  
        {/* Buttons */}
        <div className="grid grid-cols-2 items-center justify-center p-4 gap-4">
          {/* Send Message */}
          <div className="flex flex-col items-center">
            <img src="/paper-plane.png" alt="Send" className="w-12 h-12 mb-2" />
            <p className="text-sm text-center">Send<br />message</p>
          </div>
  
          {/* Dinner Invite */}
          <div className="flex flex-col items-center">
            <img src="/invitation.png" alt="Invite" className="w-12 h-12 mb-2" />
            <p className="text-sm text-center">Let’s have<br />a dinner</p>
          </div>
        </div>
      </div>
    );
  }
  