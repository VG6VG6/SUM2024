#version 300 es
/* VG6 */

precision highp float;
out vec4 OutColor;

in vec2 DrawTex;
in vec3 DrawNormal;
in vec3 DrawPos;
in vec4 DrawColor;

uniform float Time;
uniform vec3 CamDir;
uniform vec3 CamLoc;

uniform sampler2D Tex0;
uniform sampler2D Tex1;
uniform sampler2D Tex2;
uniform sampler2D Tex3;
uniform sampler2D Tex4;
uniform sampler2D Tex5;
uniform sampler2D Tex6;
uniform sampler2D Tex7;

/* Phong light model material representation type */
uniform Material
{
  vec4 Ka4;          /* Ambient Time parameters */
  vec4 KdTrans;      /* Diffuse coefficient and transparency */
  vec4 KsPh;         /* Specular coefficient and Phong power value */
  ivec4 TexFlags[2]; /* Texture flags */
};

#define Ka    Ka4.xyz
#define Kd    KdTrans.xyz
#define Ks    KsPh.xyz
#define Ph    KsPh.w
#define Trans KdTrans.w
#define IsTexture0 bool(TexFlags[0].x)
#define IsTexture1 bool(TexFlags[0].y)
#define IsTexture2 bool(TexFlags[0].z)
#define IsTexture3 bool(TexFlags[0].w)
#define IsTexture4 bool(TexFlags[1].x)
#define IsTexture5 bool(TexFlags[1].y)
#define IsTexture6 bool(TexFlags[1].z)
#define IsTexture7 bool(TexFlags[1].w)

vec3 Shade( vec3 sP, vec3 sN, vec3 sKd, vec3 sKs, float sPh )
{
  vec3 V = normalize(sP - CamLoc); 	
  vec3 L = normalize(vec3(0, -1, 0));
  
  sN = faceforward(sN, V, sN);
  
  // Diffuse lighting 
  vec3 color = 0.0 * Kd * max(0.1, dot(sN, L));

  // Specular
  vec3 R;
  color += sKs * max(0.1, pow(dot((R = reflect(V, sN)), L), sPh));
    
  color *= vec3(1.0);
  
  return color;
} /* End of 'Shade' function */

void main( void )
{
  float nl = max(0.1, dot(DrawNormal, normalize(-CamDir)));
  vec3 N = DrawNormal;


  OutColor = DrawColor;
  if (IsTexture0)
  {
    vec4 C1 = texture(Tex0, DrawTex);
    OutColor = C1;
  }
  else
    OutColor += vec4(Shade(DrawPos, N, Kd, Ks, Ph), 1);

  if (IsTexture7)
  {
    vec4 C1 = texture(Tex7, DrawTex);
    N = C1.xyz;
    OutColor += vec4(Shade(DrawPos, N, Kd, Ks, Ph), 1);
  }
}

