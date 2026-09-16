import React from "react";

interface OfficialPreacherCharacterProps {
  className?: string;
}

/**
 * Official Character for A Bíblia Resolve
 * Strictly following character guidelines:
 * - Cabeça branca, grande, lisa e redonda;
 * - Sem cabelo, barba, nariz ou orelhas;
 * - Olhos pretos ovais;
 * - Sobrancelhas finas;
 * - Boca simples;
 * - Camisa azul-royal;
 * - Calça azul-marinho;
 * - Sapatos escuros;
 * - Braços e mãos brancos;
 * - Quatro dedos corretamente formados;
 * - Segurando um caderno com esboço e apontando para a ação/botão.
 */
export const OfficialPreacherCharacter: React.FC<OfficialPreacherCharacterProps> = ({
  className = "w-36 h-48 sm:w-44 sm:h-56",
}) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        {/* Soft shadow under feet */}
        <ellipse cx="100" cy="232" rx="46" ry="6" fill="#17324D" fillOpacity="0.12" />

        {/* Dark Shoes */}
        <g id="shoes">
          {/* Left foot */}
          <path
            d="M74 218 C74 218 64 220 62 227 C61 231 65 233 76 233 C87 233 91 230 91 226 C91 222 84 218 74 218 Z"
            fill="#18181B"
          />
          <path d="M64 227 C68 226 78 226 86 228" stroke="#3F3F46" strokeWidth="1" strokeLinecap="round" />

          {/* Right foot */}
          <path
            d="M110 218 C102 218 99 222 99 226 C99 230 103 233 114 233 C125 233 129 231 128 227 C126 220 116 218 110 218 Z"
            fill="#18181B"
          />
          <path d="M104 228 C112 226 122 226 126 227" stroke="#3F3F46" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Navy Pants */}
        <g id="pants">
          <path
            d="M71 146 L69 220 L91 220 L98 165 L105 220 L127 220 L125 146 Z"
            fill="#0F172A"
            stroke="#090D16"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Subtle pants crease */}
          <line x1="98" y1="168" x2="98" y2="152" stroke="#1E293B" strokeWidth="1.5" />
        </g>

        {/* Royal Blue Shirt (Torso) */}
        <g id="shirt">
          <path
            d="M65 88 C76 84 120 84 131 88 C137 106 136 138 135 152 C135 156 128 158 98 158 C68 158 61 156 61 152 C60 138 59 106 65 88 Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Collar detail */}
          <path
            d="M84 85 L98 102 L112 85"
            stroke="#1D4ED8"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Left Arm & Hand - Holding Notebook */}
        <g id="left-arm-holding-notebook">
          {/* Upper arm sleeve */}
          <path
            d="M65 92 C56 100 48 114 46 128 C45 133 50 135 56 132 C60 120 66 108 72 98 Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="1.5"
          />
          {/* Forearm (White) */}
          <path
            d="M48 128 C42 136 38 148 42 158 C44 162 49 162 53 158 C55 150 54 140 54 132 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Sermon Outline Notebook */}
          <g transform="translate(18, 132) rotate(-8)">
            {/* Cover */}
            <rect x="0" y="0" width="38" height="48" rx="4" fill="#17324D" stroke="#E8BE58" strokeWidth="1.5" />
            {/* Spine */}
            <rect x="0" y="0" width="6" height="48" rx="2" fill="#E8BE58" />
            {/* Pages (white inner) */}
            <rect x="8" y="3" width="27" height="42" rx="2" fill="#FFFDF8" />
            {/* Outline lines / Esboço */}
            <line x1="12" y1="9" x2="31" y2="9" stroke="#C86E45" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="15" x2="28" y2="15" stroke="#356F9F" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="21" x2="30" y2="21" stroke="#356F9F" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="27" x2="26" y2="27" stroke="#356F9F" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="33" x2="29" y2="33" stroke="#2F7665" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* White Hand with 4 Cleanly Formed Fingers holding book */}
          <g id="hand-left-4-fingers">
            {/* Palm */}
            <circle cx="48" cy="158" r="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Thumb */}
            <path
              d="M44 154 C42 151 38 152 38 155 C38 158 42 160 45 158"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Finger 2 (Index) */}
            <path
              d="M45 162 C43 164 43 168 46 168 C49 168 50 164 48 162"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Finger 3 (Middle) */}
            <path
              d="M49 163 C48 166 49 170 52 170 C55 170 55 166 52 163"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Finger 4 (Pinky - 4th finger) */}
            <path
              d="M53 161 C53 164 55 167 58 166 C60 165 58 161 55 160"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
          </g>
        </g>

        {/* Right Arm & Hand - Pointing to the Action/CTA Button */}
        <g id="right-arm-pointing">
          {/* Upper arm sleeve */}
          <path
            d="M130 92 C140 98 152 110 160 120 C164 125 159 130 153 127 C146 118 138 108 126 102 Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="1.5"
          />
          {/* Forearm extending outward/downward */}
          <path
            d="M158 122 C168 132 176 142 182 148 C185 151 180 156 175 152 C170 146 162 136 153 128 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* White Hand with 4 Formed Fingers - Index clearly pointing */}
          <g id="hand-right-pointing-4-fingers">
            {/* Hand base */}
            <circle cx="178" cy="149" r="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />

            {/* Extended Index Finger Pointing */}
            <path
              d="M181 146 C186 144 196 145 198 148 C198 151 192 153 184 151 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Thumb curled */}
            <path
              d="M176 143 C178 140 182 142 181 146"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />

            {/* Middle finger curled */}
            <path
              d="M180 152 C184 153 186 157 181 158 C178 158 177 155 178 152"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />

            {/* Pinky finger curled (4th finger) */}
            <path
              d="M176 155 C179 157 180 161 176 162 C173 162 173 158 175 155"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
          </g>
        </g>

        {/* Head - Large, White, Smooth, Round (no hair, beard, nose, or ears) */}
        <g id="head">
          <ellipse
            cx="98"
            cy="52"
            rx="38"
            ry="42"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Thin dark eyebrows */}
          <path
            d="M80 40 C84 36 90 37 93 39"
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M103 39 C106 37 112 36 116 40"
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Black Oval Eyes */}
          <ellipse cx="87" cy="48" rx="4.2" ry="6.2" fill="#0F172A" />
          <ellipse cx="109" cy="48" rx="4.2" ry="6.2" fill="#0F172A" />
          {/* Subtle eye catchlight for friendly expression */}
          <circle cx="85.5" cy="46" r="1.4" fill="#FFFFFF" />
          <circle cx="107.5" cy="46" r="1.4" fill="#FFFFFF" />

          {/* Simple, gentle friendly smile line */}
          <path
            d="M88 64 C94 69 102 69 108 64"
            stroke="#334155"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
