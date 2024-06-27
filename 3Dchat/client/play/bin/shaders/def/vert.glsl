#version 300 es
precision highp float;
in vec4 InColor;
in vec3 InPosition;
in vec3 InNormal;
in vec2 InTexCoord;

uniform float Time;
uniform mat4 World;
uniform mat4 VP;

out vec2 DrawTex;
out vec3 DrawNormal;
out vec3 DrawPos;
out vec4 DrawColor;

void main( void )
{
  gl_Position =  (VP * World ) * vec4(InPosition, 1);
  DrawPos = mat3(World) * InPosition;
  DrawTex = InTexCoord;
  DrawColor = InColor;
  DrawNormal = mat3(transpose(inverse(World))) * InNormal;
  //DrawNormal = InNormal;
}
/* VG6 */